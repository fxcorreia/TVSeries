import { RootStackParamListKeys } from '@app/navigation/helpers/types/RootStackNavigationTypes'
import {
  CommonActions,
  createNavigationContainerRef,
  NavigationState,
  PartialState,
  StackActions,
} from '@react-navigation/native'

const navigationRef = createNavigationContainerRef()

const navigate = (name: RootStackParamListKeys, params?: object, key?: string, merge?: boolean) => {
  navigationRef.current?.dispatch(CommonActions.navigate({ name, params, key, merge }))
}

const push = (name: RootStackParamListKeys, params?: object | undefined) => {
  navigationRef.current?.dispatch(StackActions.push(name, params))
}

const reset = (state: PartialState<NavigationState>) => {
  navigationRef.current?.dispatch(CommonActions.reset(state))
}

const goBack = () => {
  navigationRef.current?.dispatch(CommonActions.goBack())
}

const getCurrentRoute = () => {
  return navigationRef.current?.getCurrentRoute()
}

const NavigationService = {
  ref: navigationRef,
  navigate,
  push,
  reset,
  goBack,
  getCurrentRoute,
}

export default NavigationService
