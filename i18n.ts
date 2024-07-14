// import I18n from 'i18n-js';
import { getLocales, useLocales } from 'expo-localization';
import {I18n} from 'i18n-js';
import en from './locales/en.json';
import ru from './locales/ru.json';
import ja from './locales/ja.json';
import es from './locales/es.json';


const i18n = new I18n(getLocales);

i18n.locale = getLocales()[0].languageCode ?? 'en';

i18n.translations = { en, ru, ja, es };

export default i18n;
