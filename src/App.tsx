import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { Cart } from "./pages/cart";
import { Details } from "./pages/details";
import { Layout } from "./components/layout";
import { Login } from "./pages/login";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/product/:id",
        element: <Details />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);
export { router };
