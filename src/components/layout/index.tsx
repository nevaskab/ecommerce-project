import { Header } from "../header";
import { Footer } from "../footer";
import { Outlet, ScrollRestoration } from "react-router-dom";
export function Layout() {
  return (
    <>
      <ScrollRestoration />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
