import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import PokemonCard from '../components/Card/Pokemon';
import Header from '../components/Header/index';
import TitleSection from '../components/Title/index';
import {getAllPokebag, deletePokebag} from '../db/schema';

const Pokebag = ({navigation}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getAllPokebag().then(res => {
      setData(res);
    });
  };

  const _delete = nick => {
    deletePokebag(nick).then(res => {
      getData();
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#f4f4f4'} barStyle="dark-content" />
      <ScrollView>
        <View style={styles.header}>
          <Header />
        </View>
        <View style={styles.title}>
          <TitleSection title={'Pokebag'} />
        </View>
        <View style={styles.list}>
          {data.map(pokemon => {
            return (
              <PokemonCard
                onDelete={() => _delete(pokemon?.nick)}
                pokebag
                onPress={() => navigation.navigate('Detail', {pokemon})}
                key={pokemon.nick}
                item={pokemon}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Pokebag;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
  },
  btnLoadMore: {
    backgroundColor: '#0f62fe',
    padding: 16,
    margin: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  textLoadMore: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
