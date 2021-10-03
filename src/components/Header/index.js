import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const index = ({style, right}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>
      {right ? (
        <TouchableOpacity onPress={() => navigation.navigate('Pokebag')}>
          <Text style={styles.text}>Pokebag</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
});
