import { useState, type FormEvent } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import StoreBg from "../../assets/store-background.jpg";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/register", {
        name,
        email,
        password,
      });

      alert("Account successfully created!");
      nav("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      alert(
        error.response?.data?.message || "Error creating account. Try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-(--primary-color)">
        <div className="hidden md:block relative bg-(--ruge-black)">
          <img
            src={StoreBg}
            alt="Foto de Julian O'hayon na Unsplash"
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-(--slate-indigo)/20 flex flex-col justify-center items-center p-12 text-center">
            <h1 className="text-(--primary-color) text-5xl font-bold mb-4 tracking-tight">
              Cybertech
            </h1>
            <p className="text-(--thistle) text-lg max-w-sm">
              Create your account to access exclusive offers and have full
              control over your cart.
            </p>
          </div>
        </div>
        {/* form*/}
        <div className="flex items-center justify-center p-8 bg-(--primary-color">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-(--ruge-black) mb-2">
                Create your account now!
              </h2>
              <p className="text-(--terciary-font-color)">
                Fill in the fields below to create your profile.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-(--terciary-font-color) mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg border border-(--medium-slate-blue)/50 bg-(--primary-color) text-(--ruge-black)
                  placeholder-(--terciary-font-color)/50 focus:outline-none focus:ring-1 focus:ring-(--slate-indigo) transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-(--terciary-font-color) mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourtext@cybertech.com"
                  className="w-full px-4 py-3 rounded-lg border border-(--medium-slate-blue)/50 bg-(--primary-color) text-(--ruge-black)
                  placeholder-(--terciary-font-color)/50 focus:outline-none focus:ring-1 focus:ring-(--slate-indigo) transition-colors"
                />
              </div>

              <div>
                <label className="block text-sem font-medium text-(--terciary-font-color) mb-2">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="w-full px-4 py-3 rounded-lg border border-(--medium-slate-blue)/50 bg-(--primary-color) text-(--ruge-black)
                  placeholder-(--terciary-font-color)/50 focus:outline-none focus:ring-1 focus:ring-(--slate-indigo) transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-(--medium-slate-blue) hover:bg-(--slate-indigo) text-(--primary-color) font-semibold py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-(--slate-indigo) focus:ring-offset-2 focus:ring-offset-(--ruge-black) mt-4">
                {loading ? "Wait..." : "Create account"}
              </button>
            </form>
            <p className="mt-8 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-semibold text-(--medium-slate-blue) hover:text-(--medium-slate-blue)/80 transition-colors">
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
