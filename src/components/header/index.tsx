import { Link, useNavigate } from "react-router-dom";
import LogoIcon from "../../assets/logo-icon";
import { useState, type FormEvent } from "react";
import { Heart, Search, ShoppingCart, User } from "lucide-react";
import IconButton from "../icon-button";
import { useAuth } from "../../contexts/AuthContext";

export function Header() {
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState<string>("Home");
  const tabs = ["Home", "About", "Contact Us", "Blog"];
  const activeClasses = "text-(--primary-font-color)";
  const inactiveClasses = "text-(--terciary-font-color)";
  const nav = useNavigate();
  const { isAuthenticated } = useAuth();

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
        className="flex box-border relative top-0 z-50 bg-(--primary-color) w-screen h-22 items-center justify-between lg:px-40 px-4 py-6 shadow-md shadow-blue-100 ">
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
            <button
              key={tab}
              className={`${activeTab === tab ? activeClasses : inactiveClasses}`}
              onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
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

        <div className="lg:hidden flex flex-col gap-1">
          <span className="block bg-black border-none rounded-2xl w-8 h-1"></span>
          <span className="block bg-black border-none rounded-2xl w-8 h-1"></span>
          <span className="block bg-black border-none rounded-2xl w-8 h-1"></span>
        </div>
      </header>
    </>
  );
}
