import { View, TouchableHighlight, Text } from 'react-native';
import React, { Component } from 'react';

export default (Button = (props) => {
  return (
    <TouchableHighlight
      onPress={props.onPress}
      style={{
        backgroundColor: props.color ||'lightblue',
        borderRadius: 4,
        borderColor: props.borderColor || 'rgb(200,200,200)',
        borderWidth: props.borderWidth || 1,
        margin: 0,
        width: props.width || 50,
        height: props.height || 50,
        elevation: 2
      }}
      elevation={5}
      underlayColor={props.underlayColor || '#e5efff'}
    >
      <View
        elevation={5}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowRadius: 5,
          shadowOpacity: 1.0
        }}
      >
        <Text
          style={{
            fontSize: props.fontSize || 22
          }}
        >
          {props.text}
        </Text>
      </View>
    </TouchableHighlight>
  );
});
