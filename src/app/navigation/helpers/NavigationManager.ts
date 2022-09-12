import NavigationService from '@app/navigation/helpers/NavigationService'
import {
  EpisodeDetailsNavProps,
  PeopleDetailsScreenNavProps,
  SerieDetailsNavProps,
  WebViewScreenNavProps,
} from '@app/navigation/helpers/types/RootStackNavigationTypes'

const navigateSeriesListScreen = () => {
  NavigationService.navigate('SeriesListScreen')
}

const navigateSerieDetailsScreen = (params: SerieDetailsNavProps) => {
  NavigationService.navigate('SerieDetailsScreen', params)
}

const navigateEpisodeDetailsScreen = (params: EpisodeDetailsNavProps) => {
  NavigationService.navigate('EpisodeDetailsScreen', params)
}

const navigateWebViewScreen = (params: WebViewScreenNavProps) => {
  NavigationService.navigate('WebViewScreen', params)
}

const navigateFavoritesScreen = () => {
  NavigationService.navigate('FavoritesScreen')
}

const navigatePeopleScreen = () => {
  NavigationService.navigate('PeopleScreen')
}

const navigatePeopleDetailsScreen = (params: PeopleDetailsScreenNavProps) => {
  NavigationService.navigate('PeopleDetailsScreen', params)
}

const NavigationManager = {
  navigateSeriesListScreen,
  navigateSerieDetailsScreen,
  navigateEpisodeDetailsScreen,
  navigateWebViewScreen,
  navigateFavoritesScreen,
  navigatePeopleScreen,
  navigatePeopleDetailsScreen,
}

export default NavigationManager
