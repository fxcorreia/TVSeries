/* eslint-disable react-hooks/exhaustive-deps */
import Header from '@app/components/loading/header/Header'
import EpisodeListItem from '@app/features/series/components/EpisodeListItem'
import { SeriesSliceThunks } from '@app/features/series/SeriesSlice'
import NavigationManager from '@app/navigation/helpers/NavigationManager'
import { RootStackParamList } from '@app/navigation/helpers/types/RootStackNavigationTypes'
import Colors from '@app/styles/Colors'
import Styles from '@app/styles/Styles'
import Images from '@assets/images'
import { IconStarFull } from '@assets/svgs'
import AsyncStorage from '@data/database/async-storage/AsyncStorage'
import { EpisodeModel } from '@data/model/series/EpisodeModel'
import { SerieModel } from '@data/model/series/SerieModel'
import useAppDispatch from '@hooks/useAppDispatch'
import useShallowEqualAppSelector from '@hooks/useShallowEqualAppSelector'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import _ from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  StyleSheet,
  View,
  Text,
  Image,
  SectionList,
  ListRenderItemInfo,
  SectionListData,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = NativeStackScreenProps<RootStackParamList, 'SerieDetailsScreen'> & {}

const SerieDetailsScreen = ({ route }: Props) => {
  const dispatch = useAppDispatch()
  const [t] = useTranslation()
  const serie = route.params.data
  const [buttonShowMore, setButtonShowMore] = useState<boolean>(false)
  const [readMore, setReadMore] = useState<boolean>(true)
  const favouriteList = useShallowEqualAppSelector((state) => state.series.favouriteList)
  const episodesList = useShallowEqualAppSelector((state) => state.series.episodesList)

  const seasonNumber = [...new Set(episodesList.map((item: EpisodeModel) => item.season))]
  let getFavouritesId = _.map(favouriteList, (item) => item.id)

  const isFavourite = () => {
    return getFavouritesId.includes(serie.id)
  }

  const onFavouritePress = async () => {
    let newArr: SerieModel[] = []

    if (getFavouritesId.includes(serie.id)) {
      newArr = _.filter(favouriteList, (it) => it.id !== serie.id)
    } else {
      newArr = [...favouriteList, serie]
    }

    await AsyncStorage.setFavouriteList(newArr).then(async () => {
      await dispatch(SeriesSliceThunks.getFavouriteList())
    })
  }

  const episodesBySection = () => {
    let res: any = []

    _.map(seasonNumber, (item) => {
      const ep = _.filter(episodesList, (it) => it.season === item)
      res.push({
        title: item,
        data: ep,
      })
    })
    return res
  }

  const getEpisodes = async () => {
    await dispatch(SeriesSliceThunks.getEpisodes(serie.id))
  }

  useEffect(() => {
    getEpisodes()
  }, [])

  const getImage = () => {
    if (!_.isNil(serie.image) && !_.isNil(serie.image.medium)) {
      return { uri: serie.image.medium }
    }
    return Images.tvMazeLogo
  }

  const onTextLayout = useCallback((e) => {
    if (e.nativeEvent.lines.length > 4) {
      setButtonShowMore(true)
    }
  }, [])

  const readPress = () => {
    setReadMore(!readMore)
  }

  const openWebView = () => {
    NavigationManager.navigateWebViewScreen({
      title: serie.name,
      url: serie.officialSite,
    })
  }

  const openEpisodeDetails = (item: EpisodeModel) => {
    NavigationManager.navigateEpisodeDetailsScreen({
      data: item,
    })
  }

  const keySeriesExtractor = (item: EpisodeModel, index: number): string => {
    return `${item.id}+${index}`
  }

  const renderSeriesItem = (data: ListRenderItemInfo<EpisodeModel>) => {
    return <EpisodeListItem item={data.item} onPress={openEpisodeDetails} />
  }

  const renderSectionHeader = (item: {
    section: { title: SectionListData<EpisodeModel, any> }
  }) => {
    return (
      <Text style={styles.sectionLabel}>
        {t('screens.series_details.season')}
        {item.section.title}
      </Text>
    )
  }

  const renderSeriesSeparator = () => <View style={styles.itemSeparator} />

  return (
    <SafeAreaView edges={['top']} style={styles.mainContainer}>
      <Header
        title={serie.name}
        hasBackButton
        hasFavoutire
        isFavourite={isFavourite()}
        onFavouritePress={onFavouritePress}
      />
      <LinearGradient colors={[Colors.white, Colors.gradientEnd]} style={styles.detailsContainer}>
        <LinearGradient
          colors={[Colors.secondary, Colors.primary]}
          style={styles.imageBackgroundContainer}
        >
          <Image style={styles.image} source={getImage()} resizeMode={'contain'} />
        </LinearGradient>

        {!_.isNil(episodesList) && (
          <SectionList
            sections={episodesBySection()}
            keyExtractor={keySeriesExtractor}
            renderItem={renderSeriesItem}
            renderSectionHeader={renderSectionHeader}
            ItemSeparatorComponent={renderSeriesSeparator}
            ListHeaderComponent={
              <>
                <View style={styles.summaryContainer}>
                  <Text style={styles.topics}>{t('screens.series_details.summary')}</Text>
                  {!_.isNil(serie.summary) && (
                    <Text
                      style={styles.values}
                      onTextLayout={onTextLayout}
                      numberOfLines={readMore ? 4 : undefined}
                    >
                      {serie.summary
                        .replace('<p>', '')
                        .replace('</p>', '')
                        .replace('<b>', '')
                        .replace('</b>', '')}
                    </Text>
                  )}
                  {buttonShowMore && (
                    <Text style={[styles.values, styles.readMoreText]} onPress={readPress}>
                      {readMore
                        ? t('screens.series_details.read_more')
                        : t('screens.series_details.read_less')}
                    </Text>
                  )}
                </View>
                <View style={styles.rating}>
                  <Text style={styles.topics}>{t('screens.series_details.rating')}</Text>
                  <Text style={styles.values}>
                    {!_.isNil(serie.rating.average) ? serie.rating.average : 'N/D'}
                  </Text>
                  <IconStarFull height={20} />
                </View>
                <View style={styles.rowOrientation}>
                  <Text style={styles.topics}>{t('screens.series_details.genres')}</Text>
                  {_.map(serie.genres, (item, index) => (
                    <View key={'genres_' + index} style={{}}>
                      <Text style={styles.values}>{item}, </Text>
                    </View>
                  ))}
                </View>
                <View style={styles.rowOrientation}>
                  <Text style={styles.topics}>{t('screens.series_details.schedule')}</Text>
                  {_.map(serie.schedule.days, (item, index) => (
                    <View key={'schedule-' + index} style={{}}>
                      <Text style={styles.values}>{item}, </Text>
                    </View>
                  ))}
                  <Text style={styles.values}>
                    {t('screens.series_details.at')} {serie.schedule.time}h
                  </Text>
                </View>
                <View style={styles.rowOrientation}>
                  <Text style={styles.topics}>{t('screens.series_details.officialSite')}</Text>
                  <Text style={[styles.values, styles.link]} onPress={openWebView}>
                    {serie.officialSite}
                  </Text>
                </View>
                <View style={styles.rowOrientation}>
                  <Text style={styles.topics}>{t('screens.series_details.num_seasons')}</Text>
                  <Text style={styles.values}>{seasonNumber.length}</Text>
                </View>
                <View style={styles.rowOrientation}>
                  <Text style={styles.topics}>{t('screens.series_details.episodes')}</Text>
                </View>
              </>
            }
            ListFooterComponent={<View style={styles.marginBottom} />}
          />
        )}
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: 100,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 8,
  },
  imageBackgroundContainer: {
    height: 140,
    width: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: -70,
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  summaryContainer: {
    marginTop: 10,
  },
  rowOrientation: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topics: {
    ...Styles.text.topics,
  },
  values: {
    ...Styles.text.values,
  },
  readMoreText: {
    marginTop: 3,
    color: Colors.black,
    textAlign: 'right',
  },
  link: {
    ...Styles.text.link,
  },
  sectionLabel: {
    ...Styles.text.topics,
    marginTop: 20,
  },
  marginBottom: {
    height: 50,
  },
  itemSeparator: {
    marginTop: 10,
  },
})

export default SerieDetailsScreen
