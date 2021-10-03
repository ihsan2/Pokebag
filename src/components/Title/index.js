import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const index = ({title}) => {
  return (
    <View>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: '600',
    color: '#000',
    textTransform: 'capitalize',
  },
});
