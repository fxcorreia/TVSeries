/* eslint-disable react-hooks/exhaustive-deps */
import { RootStackParamList } from '@app/navigation/helpers/types/RootStackNavigationTypes'
import Colors from '@app/styles/Colors'
import Styles from '@app/styles/Styles'
import useAppDispatch from '@hooks/useAppDispatch'
import useShallowEqualAppSelector from '@hooks/useShallowEqualAppSelector'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { TextInput, StyleSheet, View, Text, FlatList, ListRenderItemInfo } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { debounce } from 'lodash'
import Header from '@app/components/loading/header/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import PeopleSlice, { PeopleSliceThunks } from '@app/features/people/PeopleSlice'
import PeopleListItem from '@app/features/people/components/PeopleListItem'
import { PeopleModel } from '@data/model/people/PeopleModel'
import NavigationManager from '@app/navigation/helpers/NavigationManager'

type Props = NativeStackScreenProps<RootStackParamList, 'PeopleScreen'> & {}

const PeopleScreen = ({}: Props) => {
  const dispatch = useAppDispatch()
  const [t] = useTranslation()
  const [searchedPeople, setSearchedPeople] = useState<string>('')
  const searchedPeopleList = useShallowEqualAppSelector((state) => state.people.searchedPeople)

  const searchPeople = async (name: string) => {
    if (name !== '') {
      await dispatch(PeopleSliceThunks.getPeople(name))
    } else {
      dispatch(PeopleSlice.actions.clearSearchedPeopleList())
    }
  }

  const onPeoplePress = (peopleId: number, name: string) => {
    console.log('pressed peopls: ', peopleId)
    NavigationManager.navigatePeopleDetailsScreen({ id: peopleId, name: name })
  }

  const keyPeopleExtractor = (item: PeopleModel, index: number): string => {
    return `${index}`
  }

  const renderPeopleItem = (data: ListRenderItemInfo<PeopleModel>) => {
    return <PeopleListItem item={data.item.person} onPress={onPeoplePress} />
  }

  const renderPeopleSeparator = () => <View style={styles.itemSeparator} />

  const handler = useCallback(debounce(searchPeople, 600), [])

  const onChange = (name: string) => {
    setSearchedPeople(name)
    handler(name)
  }

  return (
    <SafeAreaView edges={['top']} style={styles.mainContainer}>
      <LinearGradient colors={[Colors.white, Colors.gradientEnd]} style={styles.mainContainer}>
        <Header title={t('screens.people.people')} titleStyle={styles.title} hasMenu />
        <View style={styles.screenMargin}>
          <Text style={styles.subtitle}>{t('screens.people.search_someone')}</Text>
          <View style={styles.searchBarContainer}>
            <TextInput
              placeholder={t('screens.people.search')}
              placeholderTextColor={Colors.primary}
              selectionColor={Colors.primary}
              style={styles.textInput}
              value={searchedPeople}
              onChangeText={(name: string) => onChange(name)}
            />
          </View>
        </View>
        <FlatList
          data={searchedPeopleList}
          keyExtractor={keyPeopleExtractor}
          renderItem={renderPeopleItem}
          ItemSeparatorComponent={renderPeopleSeparator}
          ListFooterComponent={<View style={styles.marginBottom} />}
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

export default PeopleScreen
