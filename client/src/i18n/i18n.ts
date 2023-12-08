import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ptBr from "./translations/pt-br.json";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      "pt": {
        translation: ptBr
      }
    },
    lng: "pt", // if you're using a language detector, do not define the lng option
    fallbackLng: "pt",
    // detects and stores the language as cookie
    detection: {
      order: ['queryString', 'cookie'],
      cache: ['cookie']
    },
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });

export default i18n;