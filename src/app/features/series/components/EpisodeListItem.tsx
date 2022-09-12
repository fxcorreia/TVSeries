import Colors from '@app/styles/Colors'
import Styles from '@app/styles/Styles'
import { IconStarFull } from '@assets/svgs'
import { EpisodeModel } from '@data/model/series/EpisodeModel'
import _ from 'lodash'

import * as React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

type Props = {
  item: EpisodeModel
  onPress: (item: EpisodeModel) => void
}

const EpisodeListItem = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.mainContainer} onPress={() => onPress(item)}>
      <View style={styles.detailsContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.label}>{item.number} - </Text>
          <Text style={styles.label}>{item.name}</Text>
        </View>
      </View>
      <View style={styles.ratingContainer}>
        <IconStarFull height={20} />
        <Text style={styles.label}>
          {!_.isNil(item.rating.average) ? item.rating.average : 'N/D'}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 30,
    borderColor: Colors.primary,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
  },
  detailsContainer: {
    flex: 0.8,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  label: {
    ...Styles.text.values,
  },
  date: {
    ...Styles.text.date,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 0.2,
  },
})

export default EpisodeListItem
