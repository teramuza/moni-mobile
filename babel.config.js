module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: 'tests/*',
          '@apis': './src/apis',
          '@images': './src/assets/images',
          '@components': './src/components',
          '@constants': './src/constants',
          '@utils': './src/utils',
          '@hooks': './src/hooks',
          '@models': './src/models',
          '@navigations': './src/navigations',
          '@networks': './src/networks',
          '@scenes': './src/scenes',
          '@stores': './src/stores',
          '@type': './src/types',
          '@themes': './src/themes',
        },
      },
    ],
  ],
};
