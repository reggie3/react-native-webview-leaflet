module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      '@babel/preset-react',
      '@babel/preset-env',
      '@babel/preset-typescript'
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-transform-arrow-functions',
      'transform-class-properties',
      '@babel/plugin-syntax-export-default-from'
    ]
  };
};
