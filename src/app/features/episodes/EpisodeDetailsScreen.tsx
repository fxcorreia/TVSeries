import Header from '@app/components/loading/header/Header'
import { RootStackParamList } from '@app/navigation/helpers/types/RootStackNavigationTypes'
import Colors from '@app/styles/Colors'
import Styles from '@app/styles/Styles'
import Images from '@assets/images'
import { IconStarFull } from '@assets/svgs'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import _ from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View, Text, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = NativeStackScreenProps<RootStackParamList, 'EpisodeDetailsScreen'> & {}

const EpisodeDetailsScreen = ({ route }: Props) => {
  const [t] = useTranslation()
  const episode = route.params.data

  const getImage = () => {
    if (!_.isNil(episode.image) && !_.isNil(episode.image.medium)) {
      return { uri: episode.image.medium }
    }
    return Images.tvMazeLogo
  }

  return (
    <SafeAreaView edges={['top']} style={styles.mainContainer}>
      <Header title={episode.name} hasBackButton />
      <LinearGradient colors={[Colors.white, Colors.gradientEnd]} style={styles.detailsContainer}>
        <LinearGradient
          colors={[Colors.secondary, Colors.primary]}
          style={styles.imageBackgroundContainer}
        >
          <Image style={styles.image} source={getImage()} resizeMode={'contain'} />
        </LinearGradient>
        <View style={styles.rowOrientation}>
          <Text style={styles.topics}>{t('screens.series_details.season')}</Text>
          <Text style={styles.values}>{episode.season}</Text>
        </View>
        <View style={styles.rowOrientation}>
          <Text style={styles.topics}>{t('screens.series_details.episode')}</Text>
          <Text style={styles.values}>{episode.number}</Text>
        </View>
        <View style={styles.summaryContainer}>
          <Text style={styles.topics}>{t('screens.series_details.summary')}</Text>
          {!_.isNil(episode.summary) && (
            <Text style={styles.values}>
              {episode.summary
                .replace('<p>', '')
                .replace('</p>', '')
                .replace('<b>', '')
                .replace('</b>', '')}
            </Text>
          )}
        </View>
        <View style={styles.rating}>
          <Text style={styles.topics}>{t('screens.series_details.rating')}</Text>
          <Text style={styles.values}>
            {!_.isNil(episode.rating.average) ? episode.rating.average : 'N/D'}
          </Text>
          <IconStarFull height={20} />
        </View>
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
    marginTop: 10,
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

export default EpisodeDetailsScreen
