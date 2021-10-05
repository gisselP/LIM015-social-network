import MockFirebase from 'mock-cloud-firestore';
import {
  postCollection, getCollection, postUserCollection, getUserCollection, deletePost, getPost,
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
  it('debería recibir un objeto', () => {
    postCollection('Pepa', 'hola, que tal', 'pepa@gmail.com', 'a3b4c5')
      .then((res) => {
        expect(typeof res).toBe('object');
      })
      .catch(() => {
      });
  });
});

describe('getCollection', () => {
  it('debería ser una función', () => {
    expect(typeof getCollection).toBe('function');
  });

  it('debería recibir un objeto', () => {
    getCollection()
      .then((res) => {
        expect(typeof res).toBe('object');
      })
      .catch(() => {
      });
  });
});
describe('postUserCollection', () => {
  it('debería ser una función', () => {
    expect(typeof postUserCollection).toBe('function');
  });
  it('debería recibir un objeto', () => {
    postUserCollection('Pepa', 'pepa@gmail.com')
      .then((res) => {
        expect(typeof res).toBe('object');
      })
      .catch(() => {
      });
  });
});

describe('getUserCollection', () => {
  it('debería ser una función', () => {
    expect(typeof getUserCollection).toBe('function');
  });
  it('debería recibir un objeto', () => {
    getUserCollection()
      .then((res) => {
        expect(typeof res).toBe('object');
      })
      .catch(() => {
      });
  });
});

describe('getPost', () => {
  it('debería ser una función', () => {
    expect(typeof getPost).toBe('function');
  });
  it('debería recibir un objeto', () => {
    getPost()
      .then((res) => {
        expect(typeof res).toBe('object');
      })
      .catch(() => {
      });
  });
});

describe('deletePost', () => {
  it('debería ser una función', () => {
    expect(typeof deletePost).toBe('function');
  });
});
