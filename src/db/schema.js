import Realm from 'realm';

export const PokebagSchema = {
  name: 'Pokebag',
  properties: {
    nick: 'string',
    name: 'string',
    url: 'string',
  },
  primaryKey: 'nick',
};

const dbOptions = {
  path: 'pokebag.realm',
  schema: [PokebagSchema],
};

export const getAllPokebag = () =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          let allPokebag = realm.objects('Pokebag');
          resolve(allPokebag);
        });
      })
      .catch(error => reject(error));
  });

export const addPokebag = newPoke =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          realm.create('Pokebag', newPoke);
          resolve(newPoke);
        });
      })
      .catch(error => reject(error));
  });

export const deletePokebag = nickName =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          let deletePokebagList = realm.objectForPrimaryKey(
            'Pokebag',
            nickName,
          );
          realm.delete(deletePokebagList);
          resolve();
        });
      })
      .catch(error => reject(error));
  });
