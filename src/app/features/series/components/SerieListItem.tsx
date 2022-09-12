import Colors from '@app/styles/Colors'
import Styles from '@app/styles/Styles'
import Images from '@assets/images'
import { IconStarFull, IconFavouriteFull, IconFavouriteEmpty } from '@assets/svgs'
import { SerieModel } from '@data/model/series/SerieModel'
import _ from 'lodash'

import * as React from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'

type Props = {
  item: SerieModel
  onPress: (item: SerieModel) => void
  onFavouritePress: (item: SerieModel) => void
  favouriteList: number[]
}

const SerieListItem = ({ item, onPress, onFavouritePress, favouriteList }: Props) => {
  const getImage = () => {
    if (!_.isNil(item) && !_.isNil(item.image) && !_.isNil(item.image.medium)) {
      return { uri: item.image.medium }
    }
    return Images.tvMazeLogo
  }
  const isFavourite = () => {
    return favouriteList.includes(item.id)
  }

  return (
    <TouchableOpacity style={styles.mainContainer} onPress={() => onPress(item)}>
      <Image style={styles.image} source={getImage()} resizeMode={'contain'} />
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.rating}>
          <IconStarFull height={20} />
          <Text style={styles.title}>
            {!_.isNil(item.rating.average) ? item.rating.average : 'N/D'}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.favouriteContainer} onPress={() => onFavouritePress(item)}>
        {isFavourite() ? <IconFavouriteFull /> : <IconFavouriteEmpty />}
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 15,
    height: 70,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.secondary,
    marginLeft: 10,
  },
  details: {
    marginLeft: 15,
    flex: 1,
  },
  title: {
    ...Styles.text.title,
  },
  rating: {
    marginTop: 4,
    marginLeft: -3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  favouriteContainer: {
    flex: 0.2,
    paddingVertical: 10,
    alignItems: 'center',
  },
})

export default SerieListItem
