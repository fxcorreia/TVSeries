import Header from '@app/components/loading/header/Header'
import Loading from '@app/components/loading/Loading'
import { RootStackParamList } from '@app/navigation/helpers/types/RootStackNavigationTypes'
import Colors from '@app/styles/Colors'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import WebView from 'react-native-webview'

type Props = NativeStackScreenProps<RootStackParamList, 'WebViewScreen'> & {}

const WebViewScreen = ({ route }: Props) => {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <Header title={route.params.title} hasBackButton />
      <WebView
        style={styles.webviewContainer}
        source={{ uri: route.params.url }}
        renderLoading={() => <Loading style={styles.loading} showLoading color={Colors.primary} />}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  webviewContainer: {
    // marginTop: 17,
  },
  loading: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: 300,
    height: 500,
  },
})

export default WebViewScreen
