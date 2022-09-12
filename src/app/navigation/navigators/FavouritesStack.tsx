import EpisodeDetailsScreen from '@app/features/episodes/EpisodeDetailsScreen'
import FavoritesScreen from '@app/features/favorites/FavoritesScreen'
import SerieDetailsScreen from '@app/features/series/SerieDetailsScreen'
import SeriesListScreen from '@app/features/series/SeriesListScreen'
import WebViewScreen from '@app/features/webview/WebViewScreen'
import { RootStackParamList } from '@app/navigation/helpers/types/RootStackNavigationTypes'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

const Stack = createNativeStackNavigator<RootStackParamList>()

const FavouritesStack = () => {
  return (
    <>
      <Stack.Navigator initialRouteName={'FavoritesScreen'} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={'FavoritesScreen'} component={FavoritesScreen} />
        <Stack.Screen name={'SeriesListScreen'} component={SeriesListScreen} />
        <Stack.Screen name={'SerieDetailsScreen'} component={SerieDetailsScreen} />
        <Stack.Screen name={'EpisodeDetailsScreen'} component={EpisodeDetailsScreen} />
        <Stack.Screen name={'WebViewScreen'} component={WebViewScreen} />
      </Stack.Navigator>
    </>
  )
}

export default FavouritesStack
