import EpisodeDetailsScreen from '@app/features/episodes/EpisodeDetailsScreen'
import PeopleDetailsScreen from '@app/features/people/PeopleDetailsScreen'
import PeopleScreen from '@app/features/people/PeopleScreen'
import SerieDetailsScreen from '@app/features/series/SerieDetailsScreen'
import SeriesListScreen from '@app/features/series/SeriesListScreen'
import WebViewScreen from '@app/features/webview/WebViewScreen'
import { RootStackParamList } from '@app/navigation/helpers/types/RootStackNavigationTypes'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

const Stack = createNativeStackNavigator<RootStackParamList>()

const PeopleStack = () => {
  return (
    <>
      <Stack.Navigator initialRouteName={'PeopleScreen'} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={'PeopleScreen'} component={PeopleScreen} />
        <Stack.Screen name={'PeopleDetailsScreen'} component={PeopleDetailsScreen} />
        <Stack.Screen name={'SeriesListScreen'} component={SeriesListScreen} />
        <Stack.Screen name={'SerieDetailsScreen'} component={SerieDetailsScreen} />
        <Stack.Screen name={'EpisodeDetailsScreen'} component={EpisodeDetailsScreen} />
        <Stack.Screen name={'WebViewScreen'} component={WebViewScreen} />
      </Stack.Navigator>
    </>
  )
}

export default PeopleStack
