import Colors from '@app/styles/Colors'
import Styles from '@app/styles/Styles'
import Images from '@assets/images'
import { PersonModel } from '@data/model/people/PeopleModel'
import _ from 'lodash'
import * as React from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'

type Props = {
  item: PersonModel
  onPress: (id: number, name: string) => void
}

const PeopleListItem = ({ item, onPress }: Props) => {
  const getImage = () => {
    if (!_.isNil(item) && !_.isNil(item.image) && !_.isNil(item.image.medium)) {
      return { uri: item.image.medium }
    }
    return Images.tvMazeLogo
  }

  return (
    <TouchableOpacity style={styles.mainContainer} onPress={() => onPress(item.id, item.name)}>
      <Image style={styles.image} source={getImage()} resizeMode={'contain'} />
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}>
          {item.name}
        </Text>
      </View>
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
})

export default PeopleListItem
