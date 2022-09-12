/* eslint-disable react-hooks/exhaustive-deps */
import SerieListItem from '@app/features/series/components/SerieListItem'
import SeriesSlice, { SeriesSliceThunks } from '@app/features/series/SeriesSlice'
import NavigationManager from '@app/navigation/helpers/NavigationManager'
import { RootStackParamList } from '@app/navigation/helpers/types/RootStackNavigationTypes'
import Colors from '@app/styles/Colors'
import Styles from '@app/styles/Styles'
import { SerieModel } from '@data/model/series/SerieModel'
import useAppDispatch from '@hooks/useAppDispatch'
import useShallowEqualAppSelector from '@hooks/useShallowEqualAppSelector'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ListRenderItemInfo,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { debounce } from 'lodash'
import _ from 'lodash'
import { IconArrowLeft, IconArrowRight } from '@assets/svgs'
import Header from '@app/components/loading/header/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@data/database/async-storage/AsyncStorage'
import AuthModal from '@app/features/series/components/AuthModal'

type Props = NativeStackScreenProps<RootStackParamList, 'SeriesListScreen'> & {}

const SeriesListScreen = ({}: Props) => {
  const dispatch = useAppDispatch()
  const [t] = useTranslation()
  const [page, setPage] = useState<number>(0)
  const [searchSerie, setSearchSerie] = useState<string>('')
  const [authModalVisible, setAuthModalVisible] = useState<boolean>(true)
  const seriesListData = useShallowEqualAppSelector((state) => state.series.seriesList)
  const searchedSeriesData = useShallowEqualAppSelector((state) => state.series.searchedSeries)
  const favouriteList = useShallowEqualAppSelector((state) => state.series.favouriteList)
  const standardSearchData = _.map(searchedSeriesData, (item) => item.show)

  const getData = async () => {
    await dispatch(SeriesSliceThunks.fetchSeries(page))
  }

  const getSearchedSerie = async (name: string) => {
    if (name !== '') {
      await dispatch(SeriesSliceThunks.searchSeries(name))
    } else {
      dispatch(SeriesSlice.actions.clearSearchedSeries())
    }
  }

  let getFavouritesId = _.map(favouriteList, (item) => item.id)

  const getFavourites = async () => {
    await dispatch(SeriesSliceThunks.getFavouriteList())
  }

  useEffect(() => {
    getData()
  }, [page])

  useEffect(() => {
    getFavourites()
  }, [])

  const previousPage = () => {
    setPage(page - 1)
  }

  const nextPage = () => {
    setPage(page + 1)
  }

  const onSeriePress = (item: SerieModel) => {
    NavigationManager.navigateSerieDetailsScreen({ data: item })
  }

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

  const handler = useCallback(debounce(getSearchedSerie, 600), [])

  const onChange = (name: string) => {
    setSearchSerie(name)
    handler(name)
  }

  return (
    <SafeAreaView edges={['top']} style={styles.mainContainer}>
      <LinearGradient colors={[Colors.white, Colors.gradientEnd]} style={styles.mainContainer}>
        <Header
          title={t('screens.series_list.tv_series')}
          titleStyle={styles.title}
          hasLogo
          hasMenu
        />
        <View style={styles.screenMargin}>
          <Text style={styles.subtitle}>{t('screens.series_list.sub_title')}</Text>
          <View style={styles.searchBarContainer}>
            <TextInput
              placeholder={t('screens.series_list.search')}
              placeholderTextColor={Colors.primary}
              selectionColor={Colors.primary}
              style={styles.textInput}
              value={searchSerie}
              onChangeText={(name: string) => onChange(name)}
            />
          </View>

          {_.isEmpty(standardSearchData) && (
            <View style={styles.paginationContainer}>
              <TouchableOpacity
                style={styles.flexPagination}
                onPress={previousPage}
                disabled={page === 0}
              >
                {page !== 0 && (
                  <>
                    <IconArrowLeft />
                    <Text style={styles.paginationText}>
                      {t('screens.series_list.previous_page')}
                    </Text>
                  </>
                )}
              </TouchableOpacity>

              <Text style={[styles.paginationText, styles.pageNumber]}>
                {t('screens.series_list.page')} {page + 1}
              </Text>

              <TouchableOpacity style={[styles.flexPagination, styles.nextPage]} onPress={nextPage}>
                <Text style={[styles.paginationText]}>{t('screens.series_list.next_page')}</Text>
                <IconArrowRight />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <FlatList
          data={!_.isEmpty(standardSearchData) ? standardSearchData : seriesListData}
          keyExtractor={keySeriesExtractor}
          renderItem={renderSeriesItem}
          ItemSeparatorComponent={renderSeriesSeparator}
          ListFooterComponent={<View style={styles.marginBottom} />}
          style={styles.flatList}
        />
      </LinearGradient>
      {<AuthModal isVisible={authModalVisible} onClose={() => setAuthModalVisible(false)} />}
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
  subtitle: {
    ...Styles.text.frontTitle,
    marginTop: 20,
  },
  searchBarContainer: {
    marginTop: 20,
    backgroundColor: Colors.primary_30Pct,
    height: 50,
    borderRadius: 20,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  textInput: {
    color: Colors.primary,
  },
  paginationContainer: {
    marginTop: 18,
    flexDirection: 'row',
  },
  flexPagination: {
    flex: 1,
    flexDirection: 'row',
  },
  paginationText: {
    height: 30,
    paddingTop: 5,
    ...Styles.text.smallText,
    color: Colors.primary,
  },
  pageNumber: {
    flex: 1,
    textAlign: 'center',
  },
  nextPage: {
    justifyContent: 'flex-end',
  },
  itemSeparator: {
    marginTop: 20,
  },
  flatList: {
    paddingTop: 10,
  },
  marginBottom: {
    height: 50,
  },
})

export default SeriesListScreen
