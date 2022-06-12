import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    // resources: {
    //   en: {
    //     translation: {
    //       description: {
    //         part1: 'Project Management App helps teams move work forward.',
    //         part2: ` Collaborate, manage projects, and reach new productivity peaks. From high rises to
    //         the home office, the way your team works is unique—accomplish it all with PMApp.`,
    //       },
    //     },
    //   },
    //   ru: {
    //     translation: {
    //       description: {
    //         part1: 'Project Management App  помогает командам достигать успеха.',
    //         part2: `Объединяйте усилия, управляйте проектами и выводите продуктивность на новые высоты. Откуда бы вы ни работали — из офиса в небоскребе или из дома — ваш совместный труд неповторим. Добейтесь всех своих целей с PMApp.`,
    //       },
    //     },
    //   },
    // },
  });

export default i18n;
