import React from 'react';
import {Text, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import FA from 'react-native-vector-icons/FontAwesome';

const Pokemon = ({item, onPress, pokebag, onDelete}) => {
  const arrUrl = item?.url.split('/');
  const id = arrUrl[arrUrl.length - 2];
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  if (pokebag) {
    return (
      <TouchableOpacity
        style={[styles.card, styles.pokebag]}
        activeOpacity={0.6}
        onPress={onPress}>
        <View style={{flex: 1}}>
          <Text style={[styles.text, {fontSize: 24}]}>{item?.nick}</Text>
          <Text style={styles.text}>{item?.name}</Text>
          <TouchableOpacity style={styles.icon} onPress={onDelete}>
            <FA name={'trash-o'} size={30} />
          </TouchableOpacity>
        </View>
        <View>
          <Image source={{uri: imageUrl}} style={styles.image} />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.6} onPress={onPress}>
      <Text style={styles.text}>{item?.name}</Text>
      <Image source={{uri: imageUrl}} style={styles.image} />
    </TouchableOpacity>
  );
};

export default Pokemon;

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    width: '100%',
    marginRight: 10,
    borderRadius: 8,
  },
  text: {
    textTransform: 'capitalize',
    fontSize: 20,
    fontWeight: '600',
  },
  image: {
    width: 72,
    height: 72,
    alignSelf: 'flex-end',
  },
  pokebag: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    marginTop: 20,
    alignSelf: 'flex-start',
  },
});
