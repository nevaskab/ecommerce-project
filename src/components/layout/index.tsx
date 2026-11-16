import { Header } from "../header";
import { Footer } from "../footer";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { AIAssistant } from "../ai-assistant";
export function Layout() {
  return (
    <>
      <ScrollRestoration />
      <Header />
      <Outlet />
      <Footer />
      <AIAssistant />
    </>
  );
}
