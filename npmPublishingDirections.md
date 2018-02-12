1. Change the maine entry in package.json
The two options for main in package.json

To run the app as an expo app: 
"main": "node_modules/expo/AppEntry.js"

When publishing to npm 
"main": "index.js"

2. Make the following changes to dependencies
move the following dependencies to dev
    "expo": "^24.0.0",
    "react": "16.0.0",
    "react-dom": "^16.2.0",
    "react-native": "https://github.com/expo/react-native/archive/sdk-24.0.0.tar.gz",
   