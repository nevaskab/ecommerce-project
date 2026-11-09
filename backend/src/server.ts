import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import { prisma } from "./lib/prisma";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { authTokenMiddleware, AuthRequest } from "./middleware/auth";

const app = express();
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
const isLocalFrontend = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(
  frontendUrl,
);
const authCookieOptions = {
  httpOnly: true,
  secure: !isLocalFrontend,
  sameSite: isLocalFrontend ? ("lax" as const) : ("none" as const),
};

app.use(
  cors({
    origin: frontendUrl,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// register route to create new user, the password is hashed before being stored in the database (using bcrypt and salt rounds of 10), and the password isnt returned in the res
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required" });
    }

    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash: _, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// login route to authenticate user and return a jwt token, the token before was stored in local storage, but after search I found out that storing the token in local storage is not sooo secure as I thought, so I decided to store the token in a cookie instead :D, this way the token is not accessible via XSS attacks, and the cookie is sent auto with every req to the serv, so the user can access protected routes without having to send the token manually in the headers, but also I know I can implement CSRF protection later to prevent CSRF attacks

// the objetive is to minimize much risks as possible ;)
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return res.status(500).json({ error: "JWT secret is not configured" });
    }

    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: "7d" });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash: _, ...userWithoutPassword } = user;

    res.cookie("token", token, {
      ...authCookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res
      .status(200)
      .json({ user: userWithoutPassword, message: "Login successful!" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// logout route to clear cookie when user logs out, this prevents the user from being able to access protected routes without logging in again
app.post("/logout", (req, res) => {
  res.clearCookie("token", authCookieOptions);
  res.status(200).json({ message: "Logout successful" });
});

app.get("/profile", authTokenMiddleware, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

function parseApiProductId(value: unknown): string | null {
  const productId = typeof value === "number" ? value : Number(value);

  if (!Number.isInteger(productId) || productId < 1) return null;

  return String(productId);
}

app.get("/cart", authTokenMiddleware, async (req: AuthRequest, res) => {
  const userId = req.userId;
  if (!userId) return res.status(401).json({ message: "Unauthorized." });

  try {
    const items = await prisma.cartItem.findMany({
      where: { userId },
      select: { id: true, apiProduct: true, quantity: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ items });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Could not load the cart." });
  }
});

app.post("/cart", authTokenMiddleware, async (req: AuthRequest, res) => {
  const userId = req.userId;
  if (!userId) return res.status(401).json({ message: "Unauthorized." });

  const apiProduct = parseApiProductId(req.body?.productId);
  const quantity = req.body?.quantity === undefined ? 1 : Number(req.body.quantity);

  if (!apiProduct || !Number.isInteger(quantity) || quantity < 1) {
    return res.status(400).json({ message: "A valid product and quantity are required." });
  }

  try {
    const item = await prisma.cartItem.upsert({
      where: {
        userId_apiProduct: { userId, apiProduct },
      },
      create: { userId, apiProduct, quantity },
      update: { quantity: { increment: quantity } },
      select: { id: true, apiProduct: true, quantity: true },
    });

    res.status(200).json({ item });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ message: "Could not add this product to the cart." });
  }
});

app.put("/cart/:productId", authTokenMiddleware, async (req: AuthRequest, res) => {
  const userId = req.userId;
  if (!userId) return res.status(401).json({ message: "Unauthorized." });

  const apiProduct = parseApiProductId(req.params.productId);
  const quantity = Number(req.body?.quantity);

  if (!apiProduct || !Number.isInteger(quantity) || quantity < 1) {
    return res.status(400).json({ message: "A valid product and quantity are required." });
  }

  try {
    const result = await prisma.cartItem.updateMany({
      where: { userId, apiProduct },
      data: { quantity },
    });

    if (result.count === 0) {
      return res.status(404).json({ message: "This product is not in the cart." });
    }

    res.status(200).json({ item: { apiProduct, quantity } });
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    res.status(500).json({ message: "Could not update the cart quantity." });
  }
});

app.delete("/cart/:productId", authTokenMiddleware, async (req: AuthRequest, res) => {
  const userId = req.userId;
  if (!userId) return res.status(401).json({ message: "Unauthorized." });

  const apiProduct = parseApiProductId(req.params.productId);

  if (!apiProduct) {
    return res.status(400).json({ message: "A valid product is required." });
  }

  try {
    const result = await prisma.cartItem.deleteMany({
      where: { userId, apiProduct },
    });

    res.status(200).json({ removed: result.count > 0 });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ message: "Could not remove this product from the cart." });
  }
});

app.get("/wishlist", authTokenMiddleware, async (req: AuthRequest, res) => {
  const userId = req.userId;
  if (!userId) return res.status(401).json({ message: "Unauthorized." });

  try {
    const items = await prisma.wishlistItem.findMany({
      where: { userId },
      select: { id: true, apiProduct: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ items });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ message: "Could not load the wishlist." });
  }
});

app.post("/wishlist", authTokenMiddleware, async (req: AuthRequest, res) => {
  const userId = req.userId;
  if (!userId) return res.status(401).json({ message: "Unauthorized." });

  const apiProduct = parseApiProductId(req.body?.productId);

  if (!apiProduct) {
    return res.status(400).json({ message: "A valid product is required." });
  }

  try {
    const item = await prisma.wishlistItem.upsert({
      where: {
        userId_apiProduct: { userId, apiProduct },
      },
      create: { userId, apiProduct },
      update: {},
      select: { id: true, apiProduct: true, createdAt: true },
    });

    res.status(200).json({ item });
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
    res.status(500).json({ message: "Could not add this product to the wishlist." });
  }
});

app.delete(
  "/wishlist/:productId",
  authTokenMiddleware,
  async (req: AuthRequest, res) => {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized." });

    const apiProduct = parseApiProductId(req.params.productId);

    if (!apiProduct) {
      return res.status(400).json({ message: "A valid product is required." });
    }

    try {
      const result = await prisma.wishlistItem.deleteMany({
        where: { userId, apiProduct },
      });

      res.status(200).json({ removed: result.count > 0 });
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
      res.status(500).json({ message: "Could not remove this product from the wishlist." });
    }
  },
);

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
