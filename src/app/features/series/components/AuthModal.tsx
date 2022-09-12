/* eslint-disable react-hooks/exhaustive-deps */
import Colors from '@app/styles/Colors'
import Styles from '@app/styles/Styles'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Modal from 'react-native-modal'
import { useTranslation } from 'react-i18next'
import ReactNativeBiometrics from 'react-native-biometrics'
import AsyncStorage from '@data/database/async-storage/AsyncStorage'
import _ from 'lodash'

type Props = {
  isVisible: boolean
  onClose: () => void
}

const AuthModal = ({ isVisible, onClose }: Props) => {
  const [t] = useTranslation()
  const [pin, setPin] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [hasPinCode, setHasPinCode] = useState<boolean>(false)
  const [savedPinCode, setSavedPinCode] = useState<string>()

  const hasPin = async () => {
    const val = await AsyncStorage.getHasPin()
    setHasPinCode(val)
    return val
  }

  const getPin = async () => {
    const val = await AsyncStorage.getPinCode()
    if (!_.isNil(val)) {
      setSavedPinCode(val)
      return val
    }
  }

  useEffect(() => {
    hasPin()
    getPin()
  }, [])

  const isBiometricSupport = async () => {
    ReactNativeBiometrics.simplePrompt({
      promptMessage: 'Confirm fingerprint to access the App',
    })
      .then((resultObject) => {
        const { success } = resultObject
        if (success) {
          onClose()
        }
      })
      .catch(() => {
        console.log('biometrics failed')
      })
  }

  const loadBiometrics = () => {
    ReactNativeBiometrics.isSensorAvailable().then((resultObject) => {
      const { available, biometryType } = resultObject

      if (
        available &&
        (biometryType === ReactNativeBiometrics.TouchID ||
          biometryType === ReactNativeBiometrics.FaceID ||
          biometryType === ReactNativeBiometrics.Biometrics)
      ) {
        isBiometricSupport()
      } else {
        console.log('Biometrics not supported')
      }
    })
  }

  useEffect(() => {
    loadBiometrics()
  }, [])

  const setPinCode = async (val: string) => {
    if (!hasPinCode) {
      console.log('pin to save:', val)
      await AsyncStorage.setPinCode(val)
      await AsyncStorage.setHasPin(true)
      onClose()
    } else {
      if (val === savedPinCode) {
        setError(false)
        onClose()
      } else {
        setError(true)
      }
    }
  }

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContainer}>
        <Text style={styles.title}>{t('screens.series_list.authentication')}</Text>
        {!hasPinCode ? (
          <Text style={styles.label}>{t('screens.series_list.set_pin')}</Text>
        ) : (
          <Text style={styles.label}>{t('screens.series_list.enter_pin')}</Text>
        )}
        <View>
          <TextInput
            placeholder={t('screens.series_list.pin_code')}
            placeholderTextColor={Colors.primary}
            selectionColor={Colors.primary}
            style={[styles.textInput, error && styles.textInputError]}
            value={pin}
            keyboardType='number-pad'
            onChangeText={(num: string) => setPin(num)}
            returnKeyType={'done'}
            onSubmitEditing={(event) => setPinCode(event.nativeEvent.text)}
          />
        </View>
        {error && <Text style={styles.error}>{t('screens.series_list.wrong_pin')}</Text>}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.white,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 16,
    marginHorizontal: 18,
    borderRadius: 5,
  },
  title: {
    ...Styles.text.bigText,
    textAlign: 'center',
  },
  label: {
    ...Styles.text.title,
    marginTop: 30,
  },
  textInput: {
    marginTop: 10,
    backgroundColor: Colors.primary_30Pct,
    height: 50,
    borderRadius: 20,
    paddingHorizontal: 15,
    justifyContent: 'center',
    color: Colors.primary,
  },
  textInputError: {
    borderWidth: 1,
    borderColor: Colors.red,
  },
  error: {
    marginTop: 5,
    ...Styles.text.error,
  },
})

export default AuthModal
