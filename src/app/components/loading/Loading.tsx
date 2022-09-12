import Colors from '@app/styles/Colors'
import * as React from 'react'
import { ActivityIndicator, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

type Props = {
  style?: StyleProp<ViewStyle>
  showLoading: boolean
  color?: string
  size?: number
}

const LOADING_SIZE = 35

const Loading = ({ style, showLoading, color, size }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator
        animating={showLoading ?? false}
        size={size ?? LOADING_SIZE}
        color={color ?? Colors.white}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
})

export default Loading
