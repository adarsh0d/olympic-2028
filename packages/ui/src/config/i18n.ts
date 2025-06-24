// Define supported locales
export const locales = ['en', 'es', 'fr', 'de', 'zh', 'ja', 'ko'] as const;
export type Locale = (typeof locales)[number];

// Default locale
export const defaultLocale: Locale = 'en';

// Locale configuration
export const localeConfig = {
  en: {
    name: 'English',
    flag: '🇺🇸',
    direction: 'ltr',
  },
  es: {
    name: 'Español',
    flag: '🇪🇸',
    direction: 'ltr',
  },
  fr: {
    name: 'Français',
    flag: '🇫🇷',
    direction: 'ltr',
  },
  de: {
    name: 'Deutsch',
    flag: '🇩🇪',
    direction: 'ltr',
  },
  zh: {
    name: '中文',
    flag: '🇨🇳',
    direction: 'ltr',
  },
  ja: {
    name: '日本語',
    flag: '🇯🇵',
    direction: 'ltr',
  },
  ko: {
    name: '한국어',
    flag: '🇰🇷',
    direction: 'ltr',
  },
} as const;

// Validate locale
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// Get locale info
export function getLocaleInfo(locale: Locale) {
  return localeConfig[locale];
} 