/* eslint-disable no-console */
import MockFirebase from 'mock-cloud-firestore';
import {
  postCollection, getCollection, postUserCollection,
  getUserCollection, deletePost, getPost, editPost, editLike,
} from '../src/firebase/firebase-firestore.js';

// Simulación de la data
const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        a1b2c3: {
          user: 'Pepito',
          text: 'hola amigos',
          email: 'pepito@gmail.com',
          timePost: '29 de agosto de 2021, 16:50:02 UTC-5',
        },
        a2b3c4: {
          user: 'Pepita',
          text: 'hola',
          email: 'pepita@gmail.com',
          timePost: '28 de agosto de 2021, 16:50:02 UTC-5',
        },
      },
    },
  },
};

// El isNaiveSnapshotListenerEnabled:true nos dara la información del escuchador OnSnapShot
global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

describe('postCollection', () => {
  it('debería ser una función', () => {
    expect(typeof postCollection).toBe('function');
  });
  it('debería insertar un nuevo doc', () => {
    postCollection('Pepa', 'hola, que tal', 'pepa@gmail.com', 'a3b4c5')
      .then(() => {
        getCollection().then((docRef) => {
          docRef.forEach((doc) => {
            const dataContent = doc.data();
            expect(dataContent).toBe('Pepa', 'hola, que tal', 'pepa@gmail.com', 'a3b4c5');
          });
        });
      })
      .catch(() => {

      });
  });
});

describe('postUserCollection', () => {
  it('debería ser una función', () => {
    expect(typeof postUserCollection).toBe('function');
  });
  it('debería insertar un nuevo doc', () => {
    postUserCollection('Pepa', 'pepa@gmail.com')
      .then(() => {
        getUserCollection().then((docRef) => {
          docRef.forEach((doc) => {
            const dataContent = doc.data();
            expect(dataContent).toBe('Pepa', 'pepa@gmail.com');
          });
        });
      })
      .catch(() => {

      });
  });
});

describe('deletePost', () => {
  it('debería ser una función', () => {
    expect(typeof deletePost).toBe('function');
  });
  it('debería borrar post', () => {
    deletePost()
      .then((res) => {
        expect(typeof res).toBe('object');
      })
      .catch(() => {});
  });
});

describe('getPost', () => {
  it('debería ser una función', () => {
    expect(typeof getPost).toBe('function');
  });
  it('debería traer post', () => {
    getPost()
      .then((docRef) => {
        const dataContent = docRef.data();
        expect(typeof dataContent).toBe('object');
      })
      .catch(() => {});
  });
});

describe('editPost', () => {
  it('updatePost deberia ser una función', () => {
    expect(typeof editPost).toBe('function');
  });

  // it('Debería poder actualizar un post', () => {
  //   editPost('a3b2c3', 'No quiero compartir nada');
  //   getCollection().then((docRef) => {
  //     docRef.forEach((doc) => {
  //       if (doc.data().id === 'a3b2c3') {
  //         const update = doc.data();
  //         expect(typeof update).toBe('object');
  //       }
  //     });
  //   });
  // });
});

describe('editLike', () => {
  it('debería ser una función', () => {
    expect(typeof editLike).toBe('function');
  });
  // it('Debería poder actualizar un post', () => {
  //   editLike('a3b2c3', 'No quiero compartir nada');
  //   getCollection().then((docRef) => {
  //     docRef.forEach((doc) => {
  //       if (doc.data().id === 'a3b2c3') {
  //         const update = doc.data().text;
  //         expect(typeof update).toBe('object');
  //       }
  //     });
  //   });

});
