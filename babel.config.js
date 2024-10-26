module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@assets': './src/assets',
            '@app-navigation': './src/app-navigation',
            '@app-views': './src/app-views',
            '@app-uikits': './src/app-uikits',
            '@app-components': './src/app-components',
            '@app-helper': './src/app-helper',
            '@app-services': './src/app-services',
            '@app-hooks': './src/app-hooks',
            '@app-layout': './src/app-layout',
            '@redux': './src/redux',   
          },
        },
      ],
      'react-native-reanimated/plugin'
    ],
  };
};
