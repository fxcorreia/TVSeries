import EpisodeDetailsScreen from '@app/features/episodes/EpisodeDetailsScreen'
import SerieDetailsScreen from '@app/features/series/SerieDetailsScreen'
import SeriesListScreen from '@app/features/series/SeriesListScreen'
import WebViewScreen from '@app/features/webview/WebViewScreen'
import { RootStackParamList } from '@app/navigation/helpers/types/RootStackNavigationTypes'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

const Stack = createNativeStackNavigator<RootStackParamList>()

const SeriesStack = () => {
  return (
    <>
      <Stack.Navigator initialRouteName={'SeriesListScreen'} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={'SeriesListScreen'} component={SeriesListScreen} />
        <Stack.Screen name={'SerieDetailsScreen'} component={SerieDetailsScreen} />
        <Stack.Screen name={'EpisodeDetailsScreen'} component={EpisodeDetailsScreen} />
        <Stack.Screen name={'WebViewScreen'} component={WebViewScreen} />
      </Stack.Navigator>
    </>
  )
}

export default SeriesStack
