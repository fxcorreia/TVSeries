import Loading from '@app/components/loading/Loading'
import Colors from '@app/styles/Colors'
import { LoadingState } from '@data/redux/ReduxTypes'
import useShallowEqualAppSelector from '@hooks/useShallowEqualAppSelector'
import _ from 'lodash'
import React from 'react'
import { StyleSheet } from 'react-native'

const AppLoading = () => {
  const isLoading = useShallowEqualAppSelector((state) =>
    _.some(state.app.loadingStates, (loadingState) => loadingState === LoadingState.LOADING),
  )

  return isLoading ? <Loading style={styles.loading} showLoading /> : null
}

const styles = StyleSheet.create({
  loading: {
    backgroundColor: Colors.black_50Pct,
  },
})

export default AppLoading
