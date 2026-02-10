import { Link } from "react-router-dom";
import LogoIcon from "../../assets/logo-icon";
import { useState, type FormEvent } from "react";
import { Heart, Search, ShoppingCart, User } from "lucide-react";
import IconButton from "../icon-button";

export function Header() {
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState<string>("Home");
  const tabs = ["Home", "About", "Contact Us", "Blog"];
  const activeClasses = "text-(--primary-font-color)";
  const inactiveClasses = "text-(--secondary-font-color)";

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (input === "") return;
  }

  return (
    <>
      <header
        id="header"
        className="flex box-border relative top-0 z-50 bg-(--primary-color) w-screen h-22 items-center justify-between px-40 shadow-md shadow-blue-100"
      >
        <Link to="/">
          <IconButton className="flex w-24 h-8" icon={<LogoIcon />} />
        </Link>

        <form
          className="w-108.25 h-14 flex gap-2 bg-(--secondary-color) rounded-lg items-center p-4"
          onSubmit={handleSubmit}
        >
          <IconButton icon={<Search size={24} color="#989898" strokeWidth={1.5} />}/>
          <input
            className="w-full h-11 border-0"
            type="text"
            placeholder="Search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>

        <div className="justify-between gap-13 flex text-base">
          {tabs.map((tab)=>(
            <button
              key={tab}
              className={`${activeTab === tab ? activeClasses : inactiveClasses}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
          
        </div>

        <div className="flex justify-between gap-6">
          <IconButton icon={<Heart size={32} color="#000" strokeWidth={1} />} />
          <IconButton icon={<ShoppingCart size={32} color="#000" strokeWidth={1} />} />
          <IconButton icon={<User size={32} color="#000" strokeWidth={1} />} />
        </div>
      </header>
    </>
  );
}
