module.exports = {
  globals: {
    "ts-jest": {
      useBabelrc: true
    }
  },
  preset: "jest-expo",
  verbose: true,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  testEnvironment: "node",
  transform: {
    "^.+\\.(js)$": "<rootDir>/node_modules/babel-jest",
    "\\.(ts|tsx)$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js|jsx)$",
  testMatch: null,
  testPathIgnorePatterns: [
    "\\.snap$",
    "<rootDir>/node_modules/",
    "<rootDir>/dist/"
  ],
  transformIgnorePatterns: [
    "node_modules/(?!index.ts)$",
    "node_modules/(?!(react-native-webview-leaflet|index)).+(ts|tsx)$",
    "node_modules/(?!(react-native|vector-icons|react-native/Libraries/Image/RelativeImageStub|react-navigation|jest-resolve|expo|lodash|enzyme|react|jest-enzyme|enzyme|jest-expo|jest-serializer-enzyme|react-native-elements|react-native-google-places-autocomplete)/)"
  ],
  moduleDirectories: ["node_modules"]
};
