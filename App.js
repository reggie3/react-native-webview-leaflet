import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import WebViewLeaflet from './WebViewLeaflet';

const locations = [
  { coords: [37.06452161, -75.67364786] },
  { coords: [36.46410354, -75.6432701] },
  { coords: [36.60061515, -76.48888338] },
  { coords: [37.0580835, -75.82318747] },
  { coords: [37.23310632, -76.23518332] },
  { coords: [36.94994253, -76.64318409] },
  { coords: [37.19810239, -76.28058546] },
  { coords: [37.02416165, -76.56052521] },
  { coords: [36.91541467, -75.49279245] },
  { coords: [36.70503123, -76.32755185] },
  { coords: [36.31605891, -76.45141618] },
  { coords: [36.59436803, -76.89486842] },
  { coords: [37.35740877, -75.77910112] },
  { coords: [37.31509182, -76.76693784] },
  { coords: [36.91815909, -76.06707072] },
  { coords: [36.611917, -75.76758822] },
  { coords: [36.79520769, -76.3959497] },
  { coords: [37.42854666, -75.95883052] },
  { coords: [36.78673099, -76.90459724] },
  { coords: [37.20966767, -75.58799685] }
];

export default class App extends React.Component {
  state = {
    location: null,
    errorMessage: null
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  render() {
    let coords = [];
    if (this.state.location !== null) {
      coords = [
        this.state.location.coords.latitude,
        this.state.location.coords.longitude
      ];
    }
    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        <Text
          style={{
            margin: 10,
            fontSize: 24,
            color: 'black'
          }}
        >
          Animated Map Markers App
        </Text>
        <WebViewLeaflet 
        mapCenterCoords={coords}
        locations={locations} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'pink',
    display: 'flex'
  },
  statusBar: {
    backgroundColor: '#C2185B',
    height: Constants.statusBarHeight
  }
});
