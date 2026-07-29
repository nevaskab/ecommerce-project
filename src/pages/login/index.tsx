import { useAuth } from "../../contexts/AuthContext";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import StoreBg from "../../assets/store-background.jpg";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");

  const { login } = useAuth();
  const nav = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await login({ email, password });
      alert("Login successful!");
      nav("/");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Login failed. Verify your credentials.");
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
              The best tech items you can find here.
            </p>
          </div>
        </div>
        {/* form*/}
        <div className="flex items-center justify-center p-8 bg-(--primary-color">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-(--ruge-black) mb-2">
                Welcome!
              </h2>
              <p className="text-(--terciary-font-color)">
                Please insert your credentials.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                <label className="block text-sm font-medium text-(--terciary-font-color) mb-2">
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

              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm font-medium text-(--medium-slate-blue) cursor-pointer">
                  <input
                    type="checkbox"
                    className="mr-2 rounded border-(--medium-slate-blue) text-(--slate-indigo) focus:ring-(--slate-indigo) bg-transparent"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  onClick={() => setIsForgotPasswordOpen(true)}
                  className="text-sm font-medium text-(--medium-slate-blue) hover:text-(--slate-indigo) transition-colors cursor-pointer">
                  Forgot your password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-(--medium-slate-blue) hover:bg-(--slate-indigo) text-(--primary-color) font-semibold py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-(--slate-indigo) focus:ring-offset-2 focus:ring-offset-(--ruge-black) mt-4">
                Login
              </button>
            </form>
            <p className="mt-8 text-center text-sm text-gray-600">
              Still don't have an account?{" "}
              <a
                href="/register"
                className="font-semibold text-(--medium-slate-blue) hover:text-(--medium-slate-blue)/80 transition-colors">
                Create an account here
              </a>
            </p>
          </div>
        </div>
        {isForgotPasswordOpen && (
          <div className="fixed inset-0 bg-(--primary-color)/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-(--primary-color) border border-(--medium-slate-blue)/30 p-6 rounded-xl w-full max-w-md relative animate-fade-in">
              <h3 className="text-xl text-center font-bold text-(--ruge-black) mb-2">
                Recover your password
                <br />
                {"("}Simulation for portfolio experience{")"}
              </h3>
              <p className="text-sm text-(--primary-color) mb-4">
                Insert your email
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(
                    `Recovery link sent to ${recoveryEmail}. (Simulation for portfolio practice)`,
                  );
                  setIsForgotPasswordOpen(false);
                  setRecoveryEmail("");
                }}>
                <input
                  type="email"
                  required
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(e.target.value)}
                  placeholder="yourtext@cybertech.com"
                  className="w-full px-4 py-3 rounded-lg border border-(--medium-slate-blue)/50 bg-(--primary-color) text-(--ruge-black)
                  placeholder-(--terciary-font-color)/50 focus:outline-none focus:ring-1 focus:ring-(--slate-indigo) transition-colors"
                />

                <div>
                  <button
                    type="button"
                    onClick={() => setIsForgotPasswordOpen(false)}
                    className="px-2 py-4 text-sm text-(--ruge-black) hover:text-(--powder-petal) transition-colors">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-(slate-indigo) hover:bg-(--medium-slate-blue) text-(--primary-color) px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                    Send link
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
