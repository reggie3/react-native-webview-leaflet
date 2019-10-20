import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

interface Props {}

export const ActivityOverlay: React.FC<Props> = () => {
  return (
    <View style={styles.activityOverlayStyle}>
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator size="large" animating={this.state.isLoading} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  activityOverlayStyle: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, .5)',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 5
  },
  activityIndicatorContainer: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 50,
    alignSelf: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  }
});
