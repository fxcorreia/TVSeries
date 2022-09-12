declare module 'react-native-android-keyboard-adjust' {
  const lib:
    | {
        setAdjustNothing: () => void
        setAdjustPan: () => void
        setAdjustResize: () => void
        setAdjustUnspecified: () => void
        setAlwaysVisible: () => void
        setAlwaysHidden: () => void
        setVisible: () => void
        setHidden: () => void
        setUnchanged: () => void
      }
    | undefined

  export default lib
}

declare module 'react-native-config' {
  export interface NativeConfig {
    // Android and iOS
    APP_BUNDLE_ID: string
    APP_VERSION: string
    APP_NAME: string

    // Android
    APP_ANDROID_VERSION_CODE: string

    // iOS
    APP_IOS_BUILD_NUMBER: string
    APP_IOS_DEVELOPMENT_TEAM: string
    APP_IOS_PROVISIONING_PROFILE: string
    APP_IOS_GOOGLE_SERVICE_INFO_FILE: string
    APP_IOS_ICON: string
    APP_IOS_LAUNCH_SCREEN: string
    APP_IOS_ASSETS_FILE: string

    // API
    API_BASE_URL: string
  }

  export const Config: NativeConfig

  export default Config
}
