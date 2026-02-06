import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files directly for bundle reliability
import en from './locales/en.json';
import tr from './locales/tr.json';
import de from './locales/de.json';
import es from './locales/es.json';
import ar from './locales/ar.json';
import it from './locales/it.json';

const resources = {
  en: { translation: en },
  tr: { translation: tr },
  de: { translation: de },
  es: { translation: es },
  ar: { translation: ar },
  it: { translation: it },
};

// Language metadata for the switcher UI
export const supportedLanguages = [
  { code: 'en', label: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  { code: 'es', label: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',

    // Language detection order
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'kiwi_lang',
    },

    interpolation: {
      escapeValue: false, // React already escapes
    },

    // Namespace config
    ns: ['translation'],
    defaultNS: 'translation',

    // React-specific
    react: {
      useSuspense: true,
    },
  });

// Apply RTL direction on language change
i18n.on('languageChanged', (lng) => {
  const langMeta = supportedLanguages.find((l) => l.code === lng);
  const dir = langMeta?.dir || 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;
});

export default i18n;
