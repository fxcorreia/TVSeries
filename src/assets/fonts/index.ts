import { Platform } from 'react-native'

const Fonts = Platform.select({
  android: {
    roboto: {
      regular: {
        fontFamily: 'Roboto-Regular',
      },
      medium: {
        fontFamily: 'Roboto-Medium',
      },
      bold: {
        fontFamily: 'Roboto-Bold',
        fontWeight: 'bold' as 'bold',
      },
    },
  },
  ios: {
    roboto: {
      regular: {
        fontFamily: 'Roboto-Regular',
      },
      medium: {
        fontFamily: 'Roboto-Medium',
      },
      bold: {
        fontFamily: 'Roboto-Bold',
        fontWeight: 'bold' as 'bold',
      },
    },
  },
})

export default Fonts
