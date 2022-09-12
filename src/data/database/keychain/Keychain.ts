import * as RNKeychain from 'react-native-keychain'

enum ValueType {
  VALUE = 'VALUE',
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
enum KeychainItem {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _getSecureValue = async (key: string): Promise<string | undefined> => {
  try {
    const result = await RNKeychain.getGenericPassword({ service: key })

    if (result) {
      return result.password
    } else {
      return undefined
    }
  } catch (error) {
    console.error(error)
    return undefined
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _setSecureValue = async (key: string, value: string): Promise<boolean> => {
  try {
    const result = await RNKeychain.setGenericPassword(ValueType.VALUE, value, { service: key })

    if (result) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error(error)
    return false
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _getSecureObject = async <T>(key: string): Promise<T | undefined> => {
  try {
    const result = await RNKeychain.getGenericPassword({ service: key })

    if (result) {
      return JSON.parse(result.password)
    } else {
      return undefined
    }
  } catch (error) {
    console.error(error)
    return undefined
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _setSecureObject = async (key: string, object: object): Promise<boolean> => {
  try {
    const result = await RNKeychain.setGenericPassword(ValueType.VALUE, JSON.stringify(object), {
      service: key,
    })

    if (result) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error(error)
    return false
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _removeSecureValue = async (key: string): Promise<boolean> => {
  try {
    return RNKeychain.resetGenericPassword({ service: key })
  } catch (error) {
    console.error(error)
    return false
  }
}

// Example:
// const getTest = async (): Promise<string | undefined> => {
//   return _getSecureValue(KeychainItem.TEST)
// }
//
// const setTest = async (value: string) => {
//   return _setSecureValue(KeychainItem.TEST, value)
// }
//
// const removeTest = async () => {
//   return _removeSecureValue(KeychainItem.TEST)
// }

const Keychain = {
  // getTest,
  // setTest,
  // removeTest,
}

export default Keychain
