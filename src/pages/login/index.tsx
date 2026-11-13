import { useAuth } from "../../contexts/AuthContext";
import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import StoreBg from "../../assets/store-background.jpg";
import IconButton from "../../components/icon-button";
import LogoIcon from "../../assets/logo-icon";
import { useTranslation } from "react-i18next";

export function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");

  const { login } = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  const requestedPath = (location.state as { from?: unknown } | null)?.from;
  const returnTo =
    typeof requestedPath === "string" &&
    requestedPath.startsWith("/") &&
    !requestedPath.startsWith("//")
      ? requestedPath
      : "/";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await login({ email, password });
      alert(t("auth.loginSuccess"));
      nav(returnTo, { replace: true });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert(t("auth.loginFailure"));
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
              {t("auth.storeTagline")}
            </p>
          </div>
        </div>
        {/* form*/}
        <div className="flex flex-col items-center justify-center p-8 bg-(--primary-color)">
            <div className="absolute m-4 top-4 left-0 flex md:ml-20 md:justify-center w-full">
              <Link to="/">
                <IconButton className="w-24 h-8 cursor-pointer" icon={<LogoIcon />} />
              </Link>
            </div>
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-(--ruge-black) mb-2">
                {t("auth.loginTitle")}
              </h2>
              <p className="text-(--terciary-font-color)">
                {t("auth.loginDescription")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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

              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm font-medium text-(--medium-slate-blue) cursor-pointer">
                  <input
                    type="checkbox"
                    className="mr-2 rounded border-(--medium-slate-blue) text-(--slate-indigo) focus:ring-(--slate-indigo) bg-transparent"
                  />
                  {t("auth.rememberMe")}
                </label>
                <button
                  type="button"
                  onClick={() => setIsForgotPasswordOpen(true)}
                  className="text-sm font-medium text-(--medium-slate-blue) hover:text-(--slate-indigo) transition-colors cursor-pointer">
                  {t("auth.forgotPassword")}
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-(--medium-slate-blue) hover:bg-(--slate-indigo) text-(--primary-color) font-semibold py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-(--slate-indigo) focus:ring-offset-2 focus:ring-offset-(--ruge-black) mt-4 cursor-pointer">
                {t("auth.login")}
              </button>
            </form>
            <p className="mt-8 text-center text-sm text-gray-600">
              {t("auth.noAccount")}{" "}
              <a
                href="/register"
                className="font-semibold text-(--medium-slate-blue) hover:text-(--medium-slate-blue)/80 transition-colors cursor-pointer">
                {t("auth.createAccountLink")}
              </a>
            </p>
          </div>
        </div>
        {isForgotPasswordOpen && (
          <div className="fixed inset-0 bg-(--primary-color)/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-(--primary-color) border border-(--medium-slate-blue)/30 p-6 rounded-xl w-full max-w-md relative animate-fade-in">
              <h3 className="text-xl text-center font-bold text-(--ruge-black) mb-2">
                {t("auth.recoverPassword")}
                <br />
                {`(${t("auth.simulation")})`}
              </h3>
              <p className="text-sm text-(--primary-color) mb-4">
                {t("auth.insertEmail")}
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(
                    t("auth.recoveryLinkSent", { email: recoveryEmail }),
                  );
                  setIsForgotPasswordOpen(false);
                  setRecoveryEmail("");
                }}>
                <input
                  type="email"
                  required
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(e.target.value)}
                  placeholder={t("auth.emailPlaceholder")}
                  className="w-full px-4 py-3 rounded-lg border border-(--medium-slate-blue)/50 bg-(--primary-color) text-(--ruge-black)
                  placeholder-(--terciary-font-color)/50 focus:outline-none focus:ring-1 focus:ring-(--slate-indigo) transition-colors"
                />

                <div>
                  <button
                    type="button"
                    onClick={() => setIsForgotPasswordOpen(false)}
                    className="px-2 py-4 text-sm text-(--ruge-black) hover:text-(--powder-petal) transition-colors cursor-pointer">
                    {t("auth.cancel")}
                  </button>
                  <button
                    type="submit"
                    className="bg-(slate-indigo) hover:bg-(--medium-slate-blue) text-(--primary-color) px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                    {t("auth.sendLink")}
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
