import React from 'react';
import EmojiSelector, { Categories } from 'react-native-emoji-selector';
import { View, StyleSheet, Modal, KeyboardAvoidingView, Button } from 'react-native';

const Modal_EmojiSelector = props => {

  return (
    <KeyboardAvoidingView>
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {
          props.onClose;
        }}>
        <View style={StyleSheet.absoluteFill}>
          <View
            style={{
                margin: 10,
                display: 'flex',
                padding: 10,
                backgroundColor: 'rgba(100,100,100, .7)'
            }}>
            <View
              style={{
                flex: 1,
                width: '100%',
                backgroundColor: 'white',
              }}>
              <EmojiSelector
                category={Categories.nature}
                onEmojiSelected={(emoji)=> props.getEmojiCallback(emoji)}
                columns={10}
                showHistory={false}
              />
            </View>
            <View style={{ padding: 5, width: '100%' }}>
              <Button onPress={()=>props.onClose()} title='Cancel'/>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default Modal_EmojiSelector;

