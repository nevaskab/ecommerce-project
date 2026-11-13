import { useState, type FormEvent } from "react";
import { api } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import StoreBg from "../../assets/store-background.jpg";
import IconButton from "../../components/icon-button";
import LogoIcon from "../../assets/logo-icon";
import { useTranslation } from "react-i18next";

export function Register() {
  const { t } = useTranslation();
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

      alert(t("auth.registerSuccess"));
      nav("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      alert(
        error.response?.data?.message || t("auth.registerError"),
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
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-(--slate-indigo)/20 flex flex-col justify-center items-center p-12 text-center">
            <h1 className="text-(--primary-color) text-5xl font-bold mb-4 tracking-tight">
              Cybertech
            </h1>
            <p className="text-(--thistle) text-lg max-w-sm">
              {t("auth.registerIntro")}
            </p>
          </div>
        </div>
        {/* form*/}
        <div className="flex items-center justify-center p-8 bg-(--primary-color">
          <div className="absolute m-4 top-4 left-0 flex md:ml-20 md:justify-center w-full">
              <Link to="/">
                <IconButton className="w-24 h-8 cursor-pointer" icon={<LogoIcon />} />
              </Link>
            </div>
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-(--ruge-black) mb-2">
                {t("auth.registerTitle")}
              </h2>
              <p className="text-(--terciary-font-color)">
                {t("auth.registerDescription")}
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-(--terciary-font-color) mb-2">
                  {t("auth.fullName")}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("auth.namePlaceholder")}
                  className="w-full px-4 py-3 rounded-lg border border-(--medium-slate-blue)/50 bg-(--primary-color) text-(--ruge-black)
                  placeholder-(--terciary-font-color)/50 focus:outline-none focus:ring-1 focus:ring-(--slate-indigo) transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-(--terciary-font-color) mb-2">
                  {t("auth.email")}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("auth.emailPlaceholder")}
                  className="w-full px-4 py-3 rounded-lg border border-(--medium-slate-blue)/50 bg-(--primary-color) text-(--ruge-black)
                  placeholder-(--terciary-font-color)/50 focus:outline-none focus:ring-1 focus:ring-(--slate-indigo) transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-(--terciary-font-color) mb-2">
                  {t("auth.password")}
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
                className="w-full bg-(--medium-slate-blue) hover:bg-(--slate-indigo) text-(--primary-color) font-semibold py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-(--slate-indigo) focus:ring-offset-2 focus:ring-offset-(--ruge-black) mt-4 cursor-pointer">
                {loading ? t("auth.wait") : t("auth.createAccount")}
              </button>
            </form>
            <p className="mt-8 text-center text-sm text-gray-600">
              {t("auth.hasAccount")}{" "}
              <a
                href="/login"
                className="font-semibold text-(--medium-slate-blue) hover:text-(--medium-slate-blue)/80 transition-colors">
                {t("auth.loginHere")}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
