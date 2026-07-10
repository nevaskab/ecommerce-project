import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { Cart } from "./pages/cart";
import { Details } from "./pages/details";
import { Layout } from "./components/layout";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Profile } from "./pages/profile";
import { GuestRoute } from "./routes/GuestRoute";
import { PrivateRoute } from "./routes/PrivateRoute";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product/:id",
        element: <Details />,
      },
    ],
  },
  {
    element: <GuestRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/cart",
            element: <Cart />,
          },
          {},
        ],
      },
    ],
  },
]);
export { router };
