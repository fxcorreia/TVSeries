import AppLoading from '@app/features/app/AppLoading'
import FavouritesStack from '@app/navigation/navigators/FavouritesStack'
import PeopleStack from '@app/navigation/navigators/PeopleStack'
import SeriesStack from '@app/navigation/navigators/SeriesStack'
import Colors from '@app/styles/Colors'
import { IconFavouriteFullColored, IconStarFull, IconTelevision } from '@assets/svgs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { StyleSheet } from 'react-native'

const Drawer = createDrawerNavigator()

const RootStackNavigator = () => {
  return (
    <>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerStyle: styles.drawerStyle,
          drawerItemStyle: styles.drawerItemStyle,
          drawerActiveTintColor: Colors.primary,
        }}
      >
        <Drawer.Screen
          name={'Series'}
          component={SeriesStack}
          options={{
            drawerIcon: () => <IconTelevision />,
          }}
        />
        <Drawer.Screen
          name={'Favorites'}
          component={FavouritesStack}
          options={{
            drawerIcon: () => <IconFavouriteFullColored />,
          }}
        />
        <Drawer.Screen
          name={'People'}
          component={PeopleStack}
          options={{
            drawerIcon: () => <IconStarFull />,
          }}
        />
      </Drawer.Navigator>
      <AppLoading />
    </>
  )
}

const styles = StyleSheet.create({
  drawerStyle: {
    backgroundColor: Colors.white,
    paddingTop: 77,
  },
  drawerItemStyle: {
    borderBottomRightRadius: 25,
    borderTopRightRadius: 25,
  },
})

export default RootStackNavigator
