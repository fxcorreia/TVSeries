import translations from '@i18n/translations.json'
import { EN_LANGUAGE } from '@utils/Constants'
import i18next from 'i18next'
import moment from 'moment'
import 'moment/locale/pt'
import { initReactI18next } from 'react-i18next'
import * as RNLocalize from 'react-native-localize'

const locales = [EN_LANGUAGE] as const

const initialize = async () => {
  const deviceLanguage = RNLocalize.findBestAvailableLanguage(locales) ?? {
    languageTag: EN_LANGUAGE,
    isRTL: false,
  }

  setMomentLocale(deviceLanguage.languageTag)

  return await i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources: translations,
    lng: deviceLanguage.languageTag,
    fallbackLng: EN_LANGUAGE,
    debug: __DEV__,
    ns: 'app',
    defaultNS: 'app',
    interpolation: {
      escapeValue: false,
    },
  })
}

const setDefaultMomentLocale = () => {
  const deviceLanguage = RNLocalize.findBestAvailableLanguage(locales) ?? {
    languageTag: EN_LANGUAGE,
    isRTL: false,
  }

  setMomentLocale(deviceLanguage.languageTag)
}

const setMomentLocale = (language: string) => {
  moment.locale(language)
}

const I18nConfig = {
  initialize,
  setDefaultMomentLocale,
  setMomentLocale,
}

export default I18nConfig
