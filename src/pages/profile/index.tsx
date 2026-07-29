import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export function Profile() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  if (!user) {
    return null;
  }

  const getUserInitials = (name?: string) => {
    if (!name) return "US";

    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  async function handleLogout() {
    logout();
    nav("/login");
  }

  return (
    <>
      {/* User Area */}
      <div className="min-h-screen bg-white">
        <div className="bg-linear-to-b from-(--slate-indigo)/30 to-transparent pt-12 pb-8 px-6 flex flex-col items-center border-b border-(--medium-slate-blue)/20">
          <div className="w-24 h-24 rounded-full bg-(--slate-indigo) flex items-center justify-center border-4 border-(--ruge-black)/30 shadow-lg mb-4">
            <span className="text-3xl">{getUserInitials(user.name)}</span>
          </div>
        </div>

        <div className="flex flex-col items-center py-2 w-50 h-full gap-4">
          <button
            onClick={() => {}}
            className="w-full h-10 bg-(--ruge-black) text-white rounded-sm border border-(--slate-indigo) shadow-lg cursor-pointer">
            Settings
          </button>
          <button
            onClick={() => {}}
            className="w-full h-10 bg-(--ruge-black) text-white rounded-sm border border-(--slate-indigo) shadow-lg cursor-pointer">
            Cart
          </button>
          <button
            onClick={() => {}}
            className="w-full h-10 bg-(--ruge-black) text-white rounded-sm border border-(--slate-indigo) shadow-lg cursor-pointer">
            Wishlist
          </button>
          <button
            onClick={() => handleLogout()}
            className="w-full h-10 bg-red-600 text-white rounded-sm border border-red-800 shadow-md cursor-pointer">
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
