module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-export-default-from'
    ]
  };
};
