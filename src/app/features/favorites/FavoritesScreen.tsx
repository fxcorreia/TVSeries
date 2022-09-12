/* eslint-disable react-hooks/exhaustive-deps */
import SerieListItem from '@app/features/series/components/SerieListItem'
import { SeriesSliceThunks } from '@app/features/series/SeriesSlice'
import NavigationManager from '@app/navigation/helpers/NavigationManager'
import { RootStackParamList } from '@app/navigation/helpers/types/RootStackNavigationTypes'
import Colors from '@app/styles/Colors'
import Styles from '@app/styles/Styles'
import { SerieModel } from '@data/model/series/SerieModel'
import useAppDispatch from '@hooks/useAppDispatch'
import useShallowEqualAppSelector from '@hooks/useShallowEqualAppSelector'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View, Text, FlatList, ListRenderItemInfo } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import _ from 'lodash'
import Header from '@app/components/loading/header/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@data/database/async-storage/AsyncStorage'

type Props = NativeStackScreenProps<RootStackParamList, 'FavoritesScreen'> & {}

const FavoritesScreen = ({}: Props) => {
  const dispatch = useAppDispatch()
  const [t] = useTranslation()

  const favouriteList = useShallowEqualAppSelector((state) => state.series.favouriteList)

  let getFavouritesId = _.map(favouriteList, (item) => item.id)

  const getFavourites = async () => {
    await dispatch(SeriesSliceThunks.getFavouriteList())
  }

  useEffect(() => {
    getFavourites()
  }, [])

  const sortedList = _.sortBy(favouriteList, 'name')

  const onFavouritePress = async (item: SerieModel) => {
    let newArr: SerieModel[] = []

    if (getFavouritesId.includes(item.id)) {
      newArr = _.filter(favouriteList, (it) => it.id !== item.id)
    } else {
      newArr = [...favouriteList, item]
    }

    await AsyncStorage.setFavouriteList(newArr).then(() => {
      getFavourites()
    })
  }

  const onSeriePress = (item: SerieModel) => {
    NavigationManager.navigateSerieDetailsScreen({ data: item })
  }

  const keySeriesExtractor = (item: SerieModel, index: number): string => {
    return `${item.id}+${index}`
  }

  const renderSeriesItem = (data: ListRenderItemInfo<SerieModel>) => {
    return (
      <SerieListItem
        item={data.item}
        onPress={onSeriePress}
        onFavouritePress={onFavouritePress}
        favouriteList={getFavouritesId}
      />
    )
  }

  const renderSeriesSeparator = () => <View style={styles.itemSeparator} />

  return (
    <SafeAreaView edges={['top']} style={styles.mainContainer}>
      <LinearGradient colors={[Colors.white, Colors.gradientEnd]} style={styles.mainContainer}>
        <Header title={t('screens.favorites.favorites')} titleStyle={styles.title} hasMenu />
        <FlatList
          data={sortedList}
          keyExtractor={keySeriesExtractor}
          renderItem={renderSeriesItem}
          ItemSeparatorComponent={renderSeriesSeparator}
          ListFooterComponent={<View style={styles.marginBottom} />}
          ListEmptyComponent={
            <View style={styles.emptyStateContiner}>
              <Text style={styles.emptyStateText}>{t('screens.favorites.no_favorites')}</Text>
            </View>
          }
          style={styles.flatList}
        />
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  screenMargin: {
    paddingHorizontal: 15,
  },
  title: {
    color: Colors.black,
  },
  flatList: {
    paddingTop: 10,
  },
  marginBottom: {
    height: 50,
  },
  itemSeparator: {
    marginTop: 20,
  },
  emptyStateContiner: {
    marginTop: 100,
    alignItems: 'center',
  },
  emptyStateText: {
    ...Styles.text.topics,
  },
})

export default FavoritesScreen
