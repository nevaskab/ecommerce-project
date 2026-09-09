import {
  Camera,
  LogOut,
  Settings,
  ShoppingBag,
  Star,
  Trash2,
} from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export function Profile() {
  const { user, logout, uploadProfilePhoto, removeProfilePhoto } = useAuth();
  const nav = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  if (!user) {
    return null;
  }

  const getUserInitials = (name?: string) => {
    const words = name?.trim().split(/\s+/).filter(Boolean);
    if (!words?.length) return "US";

    return words
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  async function handleLogout() {
    logout();
    nav("/home");
  }

  async function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Choose an image file.");
      return;
    }

    try {
      setIsUploading(true);
      await uploadProfilePhoto(file);
    } catch {
      alert("Error uploading profile photo.");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  }

  async function handleRemovePhoto() {
    try {
      setIsRemoving(true);
      await removeProfilePhoto();
    } catch {
      alert("Error removing profile photo.");
    } finally {
      setIsRemoving(false);
    }
  }

  return (
    <div className="min-h-screen bg-(--secondary-color) px-4 py-6 sm:px-6">
      <div className="mx-auto w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-xl shadow-(--slate-indigo)/10">
        <section className="bg-linear-to-br from-(--slate-indigo) to-(--medium-slate-blue) px-6 pb-8 pt-10 text-center text-white">
          <div className="relative mx-auto h-28 w-28">
            <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white/80 bg-(--ruge-black)/20 text-3xl font-semibold shadow-lg">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={`Profile photo of ${user.name}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                getUserInitials(user.name)
              )}
            </div>
            <label
              className={`absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-(--ruge-black) text-white shadow-lg ${isUploading ? "cursor-wait opacity-70" : "cursor-pointer"}`}
              title="Upload profile photo">
              <Camera size={18} aria-hidden="true" />
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="sr-only"
                onChange={handlePhotoChange}
                disabled={isUploading}
              />
              <span className="sr-only">Upload profile photo</span>
            </label>
          </div>

          <h1 className="mt-4 text-xl font-semibold">{user.name}</h1>
          <p className="m-1 text-sm text-white/75">{user.email}</p>

          <div className="mt-5 flex justify-center gap-3">
            <label className="cursor-pointer rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-(--ruge-black) shadow-sm transition hover:bg-(--powder-petal)">
              {isUploading ? "Uploading..." : "Upload photo"}
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="sr-only"
                onChange={handlePhotoChange}
                disabled={isUploading}
              />
            </label>
            {user.avatarUrl && (
              <button
                type="button"
                onClick={handleRemovePhoto}
                disabled={isRemoving}
                className="inline-flex items-center gap-2 rounded-xl border border-white/50 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60">
                <Trash2 size={16} aria-hidden="true" />
                {isRemoving ? "Removing..." : "Remove"}
              </button>
            )}
          </div>
        </section>

        <section className="space-y-3 p-4">
          <button
            type="button"
            onClick={() => {}}
            className="flex h-14 w-full items-center gap-4 rounded-2xl border border-(--medium-slate-blue)/20 px-4 text-left font-medium text-(--ruge-black) transition hover:border-(--slate-indigo) hover:bg-(--secondary-color) cursor-pointer">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-(--slate-indigo)/10 text-(--slate-indigo)">
              <Settings size={19} aria-hidden="true" />
            </span>
            Settings
          </button>

          <button
            type="button"
            onClick={() => nav("/wishlist")}
            className="flex h-14 w-full items-center gap-4 rounded-2xl border border-(--medium-slate-blue)/20 px-4 text-left font-medium text-(--ruge-black) transition hover:border-(--slate-indigo) hover:bg-(--secondary-color) cursor-pointer">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-(--slate-indigo)/10 text-(--slate-indigo)">
              <Star size={19} aria-hidden="true" />
            </span>
            Wishlist
          </button>

          <button
            type="button"
            onClick={() => nav("/cart")}
            className="flex h-14 w-full items-center gap-4 rounded-2xl border border-(--medium-slate-blue)/20 px-4 text-left font-medium text-(--ruge-black) transition hover:border-(--slate-indigo) hover:bg-(--secondary-color) cursor-pointer">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-(--slate-indigo)/10 text-(--slate-indigo)">
              <ShoppingBag size={19} aria-hidden="true" />
            </span>
            Cart
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-(--ruge-black) text-sm font-semibold text-white transition hover:bg-(--slate-indigo)">
            <LogOut size={18} aria-hidden="true" />
            Logout
          </button>
        </section>
      </div>
    </div>
  );
}
