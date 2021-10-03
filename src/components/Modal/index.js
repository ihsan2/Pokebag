import React, {useState} from 'react';
import {View, Modal, StyleSheet, Text, TextInput} from 'react-native';
import Button from '../Button';
import {useNavigation} from '@react-navigation/native';
import {addPokebag} from '../../db/schema';

const index = ({type, visible, closeModal, setType, value}) => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [err, setErr] = useState('');

  const onSubmit = () => {
    const newPoke = {
      nick: name,
      name: value.name,
      url: value.url,
    };

    addPokebag(newPoke)
      .then(res => {
        console.log('sucess add pokebag');
        setName('');
        setType('success');
      })
      .catch(() => {
        setErr('Nickname already exist, use different name');
      });
  };

  const InputView = () => {
    return (
      <View>
        <Text style={styles.title}>Gotcha!</Text>
        <View>
          <Text style={styles.subtitle}>
            Now enter your {value?.name} nickname
          </Text>
          <TextInput
            value={name}
            onChangeText={x => {
              setName(x);
              setErr('');
            }}
            style={styles.input}
          />
        </View>
        {err ? (
          <Text style={[styles.subtitle, {color: 'red'}]}>{err}</Text>
        ) : null}
        <Button onPress={onSubmit} disabled={!name} style={{marginTop: 16}}>
          Submit
        </Button>
      </View>
    );
  };

  const SuccessView = () => {
    return (
      <View>
        <Text style={[styles.title, {marginBottom: 20}]}>
          Your Pokemon is safe and sound in your pokebag.
        </Text>
        <View style={styles.buttonGroup}>
          <View style={styles.button}>
            <Button onPress={closeModal} stroke>
              Close
            </Button>
          </View>
          <View style={{marginHorizontal: 10}} />
          <View style={styles.button}>
            <Button
              onPress={() => {
                closeModal();
                navigation.navigate('Pokebag');
              }}>
              See Pokebag
            </Button>
          </View>
        </View>
      </View>
    );
  };

  const FailedView = () => {
    return (
      <View>
        <Text style={[styles.title, {marginBottom: 20}]}>
          Sorry, lady luck not in your side!
        </Text>
        <View>
          <Button onPress={closeModal} stroke>
            Close
          </Button>
        </View>
      </View>
    );
  };

  return (
    <View>
      <Modal
        visible={visible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}>
        <View style={styles.allContent}>
          <View style={styles.content}>
            {type === 'input'
              ? InputView()
              : type === 'success'
              ? SuccessView()
              : type === 'fail'
              ? FailedView()
              : null}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  allContent: {
    backgroundColor: 'rgba(0,0,0,0.82)',
    flex: 1,
    justifyContent: 'flex-end',
    height: '100%',
  },
  content: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
    paddingTop: 36,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    fontSize: 40,
    fontWeight: '600',
    marginBottom: 25,
    color: '#000',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 8,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 8,
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
  },
});
