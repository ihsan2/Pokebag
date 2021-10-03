import React from 'react';
import {View, Text} from 'react-native';

const Type = ({item, bg}) => {
  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: bg,
        marginRight: 10,
        marginBottom: 10,
        borderRadius: 5,
      }}>
      <Text style={{color: '#fff'}}>{item.name}</Text>
    </View>
  );
};

export default Type;
