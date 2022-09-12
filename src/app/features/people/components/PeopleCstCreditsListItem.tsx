/* eslint-disable react-hooks/exhaustive-deps */
import Colors from '@app/styles/Colors'
import Styles from '@app/styles/Styles'
import Images from '@assets/images'
import { SerieModel } from '@data/model/series/SerieModel'
import SeriesService from '@data/service/series/SeriesService'
import useAppDispatch from '@hooks/useAppDispatch'
import _ from 'lodash'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'

type Props = {
  id: string
  onPress: (item: SerieModel) => void
}

const PeopleCstCreditsListItem = ({ id, onPress }: Props) => {
  const dispatch = useAppDispatch()

  const [serie, setSerie] = useState<SerieModel>()

  const getSerieById = async (serieId: any) => {
    const response = await dispatch(SeriesService.getSerieById(serieId))
    if (response.ok) {
      console.log(response.data)
      setSerie(response.data)
    }
  }

  useEffect(() => {
    getSerieById(id)
  }, [])

  const getImage = () => {
    if (!_.isNil(serie) && !_.isNil(serie.image) && !_.isNil(serie.image.medium)) {
      return { uri: serie.image.medium }
    }
    return Images.tvMazeLogo
  }

  return (
    <>
      {!_.isNil(serie) && (
        <TouchableOpacity style={styles.mainContainer} onPress={() => onPress(serie)}>
          <>
            <Image style={styles.image} source={getImage()} resizeMode={'contain'} />
            <View style={styles.details}>
              <Text style={styles.title} numberOfLines={1}>
                {serie.name}
              </Text>
            </View>
          </>
        </TouchableOpacity>
      )}
    </>
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
})

export default PeopleCstCreditsListItem
