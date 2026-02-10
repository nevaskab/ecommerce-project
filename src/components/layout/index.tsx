import { Header } from "../header";
import { Footer } from "../footer";
import { Outlet } from "react-router-dom";
import { Banner } from "../banner";

export function Layout() {
  return (
    <>
      <Header />
      <Banner />
      <Outlet />
      <Footer />
    </>
  );
}
