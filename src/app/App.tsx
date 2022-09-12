import 'react-native-gesture-handler'
import NavigationService from '@app/navigation/helpers/NavigationService'
import RootStackNavigator from '@app/navigation/navigators/RootStackNavigator'
import Colors from '@app/styles/Colors'
import ReduxStore from '@data/redux/ReduxStore'
import I18nConfig from '@i18n/I18nConfig'
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { LogBox, StatusBar } from 'react-native'
import RNBootSplash from 'react-native-bootsplash'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'

LogBox.ignoreAllLogs()

const App = () => {
  const routeNameRef = useRef<string | undefined>(undefined)

  const [mountNavigation, setMountNavigation] = useState(false)

  const hideSplashScreen = () => {
    RNBootSplash.hide({ fade: true })
  }

  const startScreenTracking = () => {
    const routeName = NavigationService.getCurrentRoute()?.name

    routeNameRef.current = routeName
  }

  const trackScreen = () => {
    const currentRouteName = NavigationService.getCurrentRoute()?.name

    routeNameRef.current = currentRouteName
  }

  const initializeApp = async () => {
    await I18nConfig.initialize()
    setMountNavigation(true)
  }

  const onNavigationReady = async () => {
    hideSplashScreen()
    startScreenTracking()
  }

  const onNavigationStateChange = () => {
    trackScreen()
  }

  useEffect(() => {
    initializeApp()
  }, [])

  return (
    <Provider store={ReduxStore}>
      <SafeAreaProvider>
        <StatusBar translucent backgroundColor={Colors.primary} barStyle={'dark-content'} />
        {mountNavigation && (
          <NavigationContainer
            ref={NavigationService.ref}
            onReady={onNavigationReady}
            onStateChange={onNavigationStateChange}
          >
            <RootStackNavigator />
          </NavigationContainer>
        )}
      </SafeAreaProvider>
    </Provider>
  )
}

export default App
