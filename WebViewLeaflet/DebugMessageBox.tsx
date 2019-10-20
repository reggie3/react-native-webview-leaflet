import { View } from 'native-base';
import { ScrollView, Text } from 'react-native';
import React from 'react';

export interface Props {
  debugMessages: string[];
  doShowDebugMessages: boolean;
}

const DebugMessageBox = ({
  debugMessages = [],
  doShowDebugMessages = false
}: Props) => {
  if (doShowDebugMessages) {
    return (
      <View
        style={{
          height: 100,
          backgroundColor: 'aliceblue',
          padding: 5,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000
        }}
      >
        <ScrollView>
          {debugMessages.map((msg, idx) => {
            if (typeof msg === 'object') {
              return (
                <Text style={{ fontSize: 10 }} key={idx}>{`- ${JSON.stringify(
                  msg
                )}`}</Text>
              );
            }
            return <Text style={{ fontSize: 10 }} key={idx}>{`- ${msg}`}</Text>;
          })}
        </ScrollView>
      </View>
    );
  }
  return null;
};

export default DebugMessageBox;
