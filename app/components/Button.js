import React from 'react';
import { Platform, Text, View, TouchableOpacity, StyleSheet } from 'react-native';

import colors from '../config/colors';

function Button({ color = colors.primary, name, onPress }) {
  return (
      <TouchableOpacity activeOpacity={.3} onPress={onPress}>
        <View style={[styles.button, { backgroundColor: color }]}>
            <Text style={styles.text}>{ name }</Text>
        </View>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
      alignItems: 'center',
      borderRadius: 16,
      color: '#EEE',
      justifyContent: 'center',
      marginVertical: 15,
      width: '75%'
  },
  text: { 
      color: colors.white,
      fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
      fontSize : 20,
      fontWeight: '500',
      padding: 10
  }
});

export default Button;