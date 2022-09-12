module.exports = (api) => {
  if (api) {
    api.cache(true)
  }

  const common = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          cwd: 'packagejson',
          root: ['./'],
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
          alias: {
            '@utils': './src/utils',
            '@i18n': './src/i18n',
            '@hooks': './src/hooks',
            '@data': './src/data',
            '@assets': './src/assets',
            '@app': './src/app',
            '@analytics': './src/analytics',
            '@src': './src',
            '@root': './',
          },
        },
      ],
      // react-navigation, react-native-reanimated
      'react-native-reanimated/plugin',
      //////
    ],
  }

  if (process.env.NODE_ENV === 'production' || process.env.BABEL_ENV === 'production') {
    return {
      presets: common.presets,
      plugins: [...common.plugins, 'transform-remove-console'],
    }
  }

  return common
}
