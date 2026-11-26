import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from '@/messages/en.json';
import ru from '@/messages/ru.json';

export const SUPPORTED_LANGUAGES = ['ru', 'en'] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];
export const DEFAULT_LANGUAGE: Language = 'ru';

export const resources = {
  ru: { translation: ru },
  en: { translation: en },
} as const;

// `lng` is not set on purpose: otherwise the detector ignores the saved choice and the browser language.
// The choice is stored under `i18nextLng`, shared by every project on the domain (like the theme).
void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: SUPPORTED_LANGUAGES,
    fallbackLng: DEFAULT_LANGUAGE,
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false, // React escapes already
    },
  });

/** Keeps <html lang> in sync with the current language (screen readers, hyphenation, spell check). */
const syncLang = (lng: string) => {
  document.documentElement.lang = i18n.resolvedLanguage ?? lng;
};
syncLang(i18n.language);
i18n.on('languageChanged', syncLang);

export default i18n;
