import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import LocizeBackend from "i18next-locize-backend";
import { initReactI18next } from "react-i18next";
import englishFallback from "./locales/en/translation.json";
import portugueseFallback from "./locales/pt-BR/translation.json";

export const supportedLanguages = [
  { code: "en", label: "English", shortLabel: "EN" },
  { code: "pt-BR", label: "Português (Brasil)", shortLabel: "PT" },
] as const;

export type SupportedLanguage = (typeof supportedLanguages)[number]["code"];

const languageStorageKey = "cybertech-language";
const locizeProjectId = import.meta.env.VITE_LOCIZE_PROJECT_ID?.trim();
const locizeVersion = import.meta.env.VITE_LOCIZE_VERSION?.trim() || "latest";

const configuredI18n = locizeProjectId ? i18n.use(LocizeBackend) : i18n;

export const i18nReady = configuredI18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // Keep the local fallback for the selected language ahead of English.
    fallbackLng: false,
    supportedLngs: supportedLanguages.map(({ code }) => code),
    load: "currentOnly",
    resources: {
      en: { fallback: englishFallback },
      "pt-BR": { fallback: portugueseFallback },
    },
    partialBundledLanguages: true,
    ns: ["translation", "fallback"],
    defaultNS: "translation",
    fallbackNS: "fallback",
    backend: locizeProjectId
      ? { projectId: locizeProjectId, version: locizeVersion }
      : undefined,
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: languageStorageKey,
      caches: [],
      convertDetectedLanguage: (language) => {
        const baseLanguage = language.toLowerCase().split(/[-_]/)[0];
        if (baseLanguage === "pt") return "pt-BR";
        if (baseLanguage === "en") return "en";
        return "en";
      },
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  })
  .then(() => {
    document.documentElement.lang = i18n.resolvedLanguage ?? i18n.language;
  });

i18n.on("languageChanged", (language) => {
  document.documentElement.lang = i18n.resolvedLanguage ?? language;
});

export function persistLanguage(language: SupportedLanguage) {
  try {
    localStorage.setItem(languageStorageKey, language);
  } catch {
    // ignore localStorage errors
  }
}

export default i18n;
