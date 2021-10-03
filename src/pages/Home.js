import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {useInfiniteQuery} from 'react-query';
import axios from 'axios';
import PokemonCard from '../components/Card/Pokemon';
import Header from '../components/Header/index';
import TitleSection from '../components/Title/index';
import Button from '../components/Button';

const Home = ({navigation}) => {
  const {data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage} =
    useInfiniteQuery(
      'pokemons',
      async ({pageParam = 0}) => {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${pageParam}`,
        );
        return res.data;
      },
      {
        getNextPageParam: lastPage => {
          let nextOffset = lastPage?.next
            ? lastPage?.next.split('offset=')[1].split('&')[0]
            : false;
          return nextOffset;
        },
      },
    );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#f4f4f4'} barStyle="dark-content" />
      <ScrollView>
        <View style={styles.header}>
          <Header right />
        </View>
        <View style={styles.title}>
          <TitleSection title={'Pokedex'} />
        </View>
        {data?.pages.map(page => {
          return (
            <View key={page?.next} style={styles.list}>
              {page?.results.map(pokemon => {
                return (
                  <PokemonCard
                    onPress={() => navigation.navigate('Detail', {pokemon})}
                    key={pokemon.name}
                    item={pokemon}
                  />
                );
              })}
            </View>
          );
        })}
        {hasNextPage && (
          <Button
            style={{margin: 16}}
            disabled={isFetchingNextPage}
            onPress={() => {
              fetchNextPage();
            }}
            loading={isFetchingNextPage}>
            Load More
          </Button>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

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
});
