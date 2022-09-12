// react-navigation, react-native-gesture-handler
// Leave this import at the top!
import 'react-native-gesture-handler'
//////

import App from '@app/App'
import { AppRegistry } from 'react-native'
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => App)
