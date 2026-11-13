import { useState } from "react";
import { ChevronDown, Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  persistLanguage,
  supportedLanguages,
  type SupportedLanguage,
} from "../../i18n";

export function LanguageSelector({
  mobile = false,
  onSelect,
}: {
  mobile?: boolean;
  onSelect?: () => void;
}) {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const currentLanguage =
    supportedLanguages.find(
      ({ code }) => code === (i18n.resolvedLanguage ?? i18n.language),
    ) ?? supportedLanguages[0];

  function selectLanguage(language: SupportedLanguage) {
    persistLanguage(language);
    void i18n.changeLanguage(language);
    setIsOpen(false);
    onSelect?.();
  }

  if (mobile) {
    return (
      <div className="space-y-2">
        <p className="text-sm font-semibold text-(--terciary-font-color)">
          {t("header.language")}
        </p>
        <div className="flex gap-2">
          {supportedLanguages.map((language) => (
            <button
              key={language.code}
              type="button"
              aria-pressed={currentLanguage.code === language.code}
              onClick={() => selectLanguage(language.code)}
              className={`rounded-lg border px-3 py-2 text-sm font-medium ${
                currentLanguage.code === language.code
                  ? "border-indigo-600 bg-indigo-600 text-white"
                  : "border-slate-200 text-slate-700"
              }`}>
              {language.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${isOpen ? "z-100" : ""}`}>
      <button
        type="button"
        aria-label={t("header.selectLanguage")}
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex h-10 items-center gap-1.5 rounded-lg px-2 text-sm font-semibold text-(--primary-font-color) transition-colors hover:bg-(--secondary-color) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        <Languages size={19} aria-hidden="true" />
        <span>{currentLanguage.shortLabel}</span>
        <ChevronDown size={14} aria-hidden="true" />
      </button>
      {isOpen && (
        <div
          role="group"
          aria-label={t("header.selectLanguage")}
          className="absolute right-0 top-full z-70 mt-2 min-w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
          {supportedLanguages.map((language) => (
            <button
              key={language.code}
              type="button"
              aria-pressed={currentLanguage.code === language.code}
              onClick={() => selectLanguage(language.code)}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                currentLanguage.code === language.code
                  ? "bg-indigo-50 font-semibold text-indigo-700"
                  : "text-slate-700 hover:bg-slate-50"
              }`}>
              {language.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
