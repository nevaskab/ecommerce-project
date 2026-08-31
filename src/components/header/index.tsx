import { Link, NavLink, useNavigate } from "react-router-dom";
import LogoIcon from "../../assets/logo-icon";
import { useEffect, useState, type FormEvent } from "react";
import { Heart, Search, ShoppingCart, User } from "lucide-react";
import IconButton from "../icon-button";
import { useAuth } from "../../contexts/AuthContext";

export function Header() {
  const [input, setInput] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const tabs = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Contact Us", to: "/contact" },
    { label: "Blog", to: "/blog" },
  ];
  const activeClasses = "text-(--primary-font-color)";
  const inactiveClasses = "text-(--terciary-font-color)";
  const nav = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMobileMenuOpen]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (input === "") return;
  }

  // function to handle user icon click, if the user is authenticated: nav to profile page, if not: nav to login page
  function handleUserIconClick() {
    if (isAuthenticated) {
      nav("/profile");
    } else {
      nav("/login");
    }
  }

  // this is my header component, it has logo, search bar, icons and more, as my first big full-stack project, I decided to make it responsive using Tailwind as mobile-first and sure this has a lot of room for improvement, but I think it is a good start, I will improve it later as I learn more about Tailwind and responsive design <3
  return (
    <>
      <header
        id="header"
        className="flex box-border relative top-0 bg-(--primary-color) w-screen h-22 items-center justify-between lg:px-10 px-4 py-6 shadow-md shadow-blue-100 ">
        <Link to="/">
          <IconButton className="flex w-24 h-8" icon={<LogoIcon />} />
        </Link>

        <form
          className="hidden lg:flex w-108.25 h-14 gap-2 bg-(--secondary-color) rounded-lg items-center p-4"
          onSubmit={handleSubmit}>
          <IconButton
            icon={<Search size={24} color="#989898" strokeWidth={1.5} />}
          />
          <input
            className="w-full h-11 border-0"
            type="text"
            placeholder="Search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>

        <div className="hidden lg:flex justify-between gap-13 text-base">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                isActive ? activeClasses : inactiveClasses
              }
              onClick={() => setIsMobileMenuOpen(false)}>
              {tab.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex justify-between gap-6">
          <IconButton
            icon={<Heart size={32} color="#000" strokeWidth={1} />}
            link="/wishlist"
          />
          <IconButton
            icon={<ShoppingCart size={32} color="#000" strokeWidth={1} />}
            link="/cart"
          />
          <IconButton
            icon={
              <User
                size={32}
                color="#000"
                strokeWidth={1}
                onClick={handleUserIconClick}
                className="cursor-pointer"
              />
            }
          />
        </div>
        <button
          type="button"
          className="lg:hidden relative z-100 flex h-10 w-10 flex-col items-center justify-center gap-1.5"
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}>
          <span
            className={`block h-1 w-8 rounded-2xl bg-black transition-transform duration-300 ${
              isMobileMenuOpen ? "translate-y-2.5 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-1 w-8 rounded-2xl bg-black transition-opacity duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-1 w-8 rounded-2xl bg-black transition-transform duration-300 ${
              isMobileMenuOpen ? "-translate-y-2.5 -rotate-45" : ""
            }`}
          />
        </button>
      </header>

      <div
        className={`lg:hidden fixed inset-0 z-60 bg-black/35 transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <aside
        id="mobile-menu"
        aria-hidden={!isMobileMenuOpen}
        className={`lg:hidden fixed top-0 right-0 z-60 flex h-dvh w-3/5 flex-col gap-8 overflow-y-auto bg-(--primary-color) px-5 py-8 shadow-xl transition-transform duration-350 ease-in-out ${
          isMobileMenuOpen
            ? "translate-x-0 visible"
            : "translate-x-full pointer-events-none"
        }`}>
        <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
          <IconButton className="flex h-8 w-24" icon={<LogoIcon />} />
        </Link>

        <form
          className="flex h-12 w-full gap-2 rounded-lg bg-(--secondary-color) p-3"
          onSubmit={handleSubmit}>
          <IconButton
            icon={<Search size={22} color="#989898" strokeWidth={1.5} />}
          />
          <input
            className="min-w-0 flex-1 border-0 bg-transparent"
            type="text"
            placeholder="Search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>

        <nav
          className="flex flex-col gap-5 text-base"
          aria-label="Navegação principal">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                isActive ? activeClasses : inactiveClasses
              }
              onClick={() => setIsMobileMenuOpen(false)}>
              {tab.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex gap-5" onClick={() => setIsMobileMenuOpen(false)}>
          <IconButton
            icon={<Heart size={30} color="#000" strokeWidth={1} />}
            link="/wishlist"
          />
          <IconButton
            icon={<ShoppingCart size={30} color="#000" strokeWidth={1} />}
            link="/cart"
          />
          <IconButton
            icon={
              <User
                size={30}
                color="#000"
                strokeWidth={1}
                onClick={handleUserIconClick}
                className="cursor-pointer"
              />
            }
          />
        </div>
      </aside>
    </>
  );
}
