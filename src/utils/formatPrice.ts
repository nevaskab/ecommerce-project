import i18n from "../i18n";

export function formatPrice(value: number) {
  const locale = i18n.resolvedLanguage ?? i18n.language ?? "en";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
  }).format(value);
}
