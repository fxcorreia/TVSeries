/* eslint-disable react-hooks/exhaustive-deps */
import Header from '@app/components/loading/header/Header'
import PeopleCstCreditsListItem from '@app/features/people/components/PeopleCstCreditsListItem'
import { PeopleSliceThunks } from '@app/features/people/PeopleSlice'
import NavigationManager from '@app/navigation/helpers/NavigationManager'
import { RootStackParamList } from '@app/navigation/helpers/types/RootStackNavigationTypes'
import Colors from '@app/styles/Colors'
import Styles from '@app/styles/Styles'
import Images from '@assets/images'
import { PeopleHrefModel } from '@data/model/people/PeopleCastCreditsModel'
import { SerieModel } from '@data/model/series/SerieModel'
import useAppDispatch from '@hooks/useAppDispatch'
import useShallowEqualAppSelector from '@hooks/useShallowEqualAppSelector'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import _ from 'lodash'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View, Text, Image, ListRenderItemInfo, FlatList } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = NativeStackScreenProps<RootStackParamList, 'PeopleDetailsScreen'> & {}

const PeopleDetailsScreen = ({ route }: Props) => {
  const dispatch = useAppDispatch()
  const [t] = useTranslation()
  const peopleId = route.params.id
  const name = route.params.name
  const peopleCastCredits = useShallowEqualAppSelector((state) => state.people.peopleCastCredits)

  const seriesParticipated = () => {
    if (!_.isNil(peopleCastCredits)) {
      return _.map(peopleCastCredits._embedded.castcredits, (item) => item._links.show)
    }
    return []
  }

  const getPeopleCastCredits = async () => {
    await dispatch(PeopleSliceThunks.getPeopleCastCredits(peopleId))
  }

  useEffect(() => {
    getPeopleCastCredits()
  }, [])

  const getImage = () => {
    if (!_.isNil(peopleCastCredits?.image) && !_.isNil(peopleCastCredits?.image.medium)) {
      return { uri: peopleCastCredits?.image.medium }
    }
    return Images.tvMazeLogo
  }

  const onSeriePress = (item: SerieModel) => {
    NavigationManager.navigateSerieDetailsScreen({ data: item })
  }

  const keySeriesExtractor = (item: PeopleHrefModel): string => {
    return item.href
  }

  const renderSeriesItem = (data: ListRenderItemInfo<PeopleHrefModel>) => {
    console.log(data.item.href)
    const serieId: string = data.item.href.split('/')[4]

    return <PeopleCstCreditsListItem id={serieId} onPress={onSeriePress} />
  }

  const renderSeriesSeparator = () => <View style={styles.itemSeparator} />

  return (
    <SafeAreaView edges={['top']} style={styles.mainContainer}>
      <Header title={name} hasBackButton />
      <LinearGradient colors={[Colors.white, Colors.gradientEnd]} style={styles.detailsContainer}>
        {!_.isNil(peopleCastCredits) && (
          <>
            <LinearGradient
              colors={[Colors.secondary, Colors.primary]}
              style={styles.imageBackgroundContainer}
            >
              <Image style={styles.image} source={getImage()} resizeMode={'contain'} />
            </LinearGradient>
            <Text style={styles.topics}>{t('screens.people.cast_credits')}</Text>
            <FlatList
              data={seriesParticipated()}
              keyExtractor={keySeriesExtractor}
              renderItem={renderSeriesItem}
              ItemSeparatorComponent={renderSeriesSeparator}
              ListFooterComponent={<View style={styles.marginBottom} />}
              style={styles.flatList}
            />
          </>
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
  topics: {
    marginTop: 30,
    ...Styles.text.topics,
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

export default PeopleDetailsScreen
