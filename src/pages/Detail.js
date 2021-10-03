import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Image,
  Animated,
} from 'react-native';
import {useQuery} from 'react-query';
import axios from 'axios';
import Header from '../components/Header/index';
import TitleSection from '../components/Title/index';
import TypeCard from '../components/Card/Type';
import ModalBottom from '../components/Modal/index';
import * as Animatable from 'react-native-animatable';

const Detail = ({route}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [type, setType] = useState('');

  const {pokemon} = route.params;
  const arrUrl = pokemon?.url.split('/');
  const id = arrUrl[arrUrl.length - 2];
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  const {data} = useQuery('pokemon', async () => {
    const res = await axios.get(pokemon?.url);
    return res.data;
  });

  const _catchPokemon = () => {
    const condition = Math.random() <= 0.5;
    if (condition) {
      setIsVisible(true);
      setType('input');
    } else {
      setIsVisible(true);
      setType('fail');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#f4f4f4'} barStyle="dark-content" />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.header}>
          <Header right />
        </View>
        <View style={styles.title}>
          <TitleSection title={pokemon?.name} />
        </View>
        <View style={styles.type}>
          {data?.types.map((type, key) => {
            return <TypeCard bg={'#161616'} key={key} item={type.type} />;
          })}
        </View>
        <View>
          <Image style={styles.image} source={{uri: imageUrl}} />
        </View>
        <View style={styles.moveView}>
          <View style={{marginBottom: 16}}>
            <TitleSection title={'Ability'} />
          </View>
          <View style={styles.moves}>
            {data?.abilities.map((abl, key) => {
              return <TypeCard bg={'#F27E3F'} key={key} item={abl.ability} />;
            })}
          </View>
          <View style={{marginBottom: 16}}>
            <TitleSection title={'Moves'} />
          </View>
          <View style={styles.moves}>
            {data?.moves.map((move, key) => {
              return <TypeCard bg={'#0f62fe'} key={key} item={move.move} />;
            })}
          </View>
        </View>
      </ScrollView>
      <Animatable.View
        animation="slideInUp"
        iterationCount={'infinite'}
        duration={3000}
        iterationDelay={500}>
        <TouchableOpacity
          onPress={_catchPokemon}
          activeOpacity={0.92}
          style={styles.btnCatch}>
          <Image
            source={require('../asset/pokeball.png')}
            style={{width: 72, height: 72}}
          />
        </TouchableOpacity>
      </Animatable.View>
      <ModalBottom
        value={pokemon}
        visible={isVisible}
        closeModal={() => setIsVisible(false)}
        type={type}
        setType={x => setType(x)}
      />
    </SafeAreaView>
  );
};

export default Detail;

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
  type: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
  },
  image: {
    width: 240,
    height: 240,
    alignSelf: 'center',
  },
  moveView: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    paddingVertical: 24,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  moves: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  btnCatch: {
    position: 'absolute',
    bottom: 120,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});
