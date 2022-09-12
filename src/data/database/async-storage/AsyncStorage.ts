import { SerieModel } from '@data/model/series/SerieModel'
import RNAsyncStorage from '@react-native-async-storage/async-storage'
import _ from 'lodash'

enum StorageItem {
  FAVOURITE_LIST = 'FAVOURITE_LIST',
  ALERT_OPENED_COUNTER = 'ALERT_OPENED_COUNTER',
  HAS_PIN = 'HAS_PIN',
  PIN_CODE = 'PIN_CODE',
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _getBoolean = async (storageKey: string) => {
  try {
    const data = await RNAsyncStorage.getItem(storageKey)

    if (!_.isNil(data)) {
      return data === 'true'
    } else {
      return false
    }
  } catch (error) {
    console.error(error)
    return false
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _setBoolean = async (storageKey: string, data: boolean) => {
  return RNAsyncStorage.setItem(storageKey, _.toString(data))
}

const _getModel = async <T>(storageKey: string) => {
  try {
    const data = await RNAsyncStorage.getItem(storageKey)

    if (!_.isNil(data)) {
      return JSON.parse(data) as T
    } else {
      return null
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getString = async (storageKey: string) => {
  try {
    const data = await RNAsyncStorage.getItem(storageKey)

    if (!_.isNil(data)) {
      return data
    } else {
      return null
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const setString = async (storageKey: string, data: string) => {
  return RNAsyncStorage.setItem(storageKey, data)
}

const _setModel = async (storageKey: string, data: object) => {
  return RNAsyncStorage.setItem(storageKey, JSON.stringify(data))
}

const getFavouriteList = async (): Promise<SerieModel[] | null> => {
  // return _getModel<SerieModel[]>(StorageItem.FAVOURITE_LIST)
  const list = _getModel<SerieModel[]>(StorageItem.FAVOURITE_LIST)
  return list ?? []
}

const setFavouriteList = async (value: SerieModel[]) => {
  return _setModel(StorageItem.FAVOURITE_LIST, value)
}

const setPinCode = async (id: string) => {
  return setString(StorageItem.PIN_CODE, id)
}

const getPinCode = async () => {
  return getString(StorageItem.PIN_CODE)
}

const setHasPin = async (value: boolean) => {
  return _setBoolean(StorageItem.HAS_PIN, value)
}

const getHasPin = async () => {
  return _getBoolean(StorageItem.HAS_PIN)
}

const AsyncStorage = {
  getFavouriteList,
  setFavouriteList,
  setHasPin,
  getHasPin,
  setPinCode,
  getPinCode,
}

export default AsyncStorage
