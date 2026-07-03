import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: string;
}

// middleware to verify the jwt token sent in the cookie, if the token is valid, the userId is added to the req object, otherwise a 401 err is returned
export function authTokenMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token." });
      }

      req.userId = decoded.userId;
      return next();
    },
  );
}
