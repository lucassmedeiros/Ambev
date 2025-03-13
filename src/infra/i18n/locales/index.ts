import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./assets/en.json";
import pt from "./assets/pt-br.json";


const resources = {
  en: { translation: en },
  pt: { translation: pt },
};

export const defaultLanguage = window.navigator.language;

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLanguage,
  fallbackLng: "pt",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
