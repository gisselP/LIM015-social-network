// eslint-disable-next-line object-curly-newline
import { createUser, registerGoogle, emailVerification, signInUser, signOutUser, currentUser, onAuthStateChanged } from '../src/firebase/firebase-auth.js';

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockAuthentication();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  () => mockauth,
);

describe('createUser', () => {
  it('debería ser una función', () => {
    expect(typeof createUser).toBe('function');
  });
  it('Debería crear un usuario con el email miau@gmail.com', () => createUser('miau@gmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('miau@gmail.com');
    }));
  it('Debería crear un usuario con contraseña 123456', () => createUser('miau1@gmail.com', '1234567')
    .then((user) => {
      expect(user.password).toBe('1234567');
    }));
});

describe('registerGoogle', () => {
  it('debería ser una función', () => {
    expect(typeof registerGoogle).toBe('function');
  });
  it('Debe logearse con Google', () => {
    registerGoogle()
      .then((user) => {
        expect(user.displayName).toBe(undefined);
      });
  });
});

describe('emailVerification', () => {
  it('debería ser una función', () => {
    expect(typeof emailVerification).toBe('function');
  });
  it('Debería enviar un email de verificación', () => {
    const verificationMock = jest.fn();
    firebase.auth().currentUser.sendEmailVerification = verificationMock;
    emailVerification();
    expect(verificationMock).toHaveBeenCalled();
    expect(verificationMock.mock.calls).toHaveLength(1);
  });
});

describe('signInUser', () => {
  it('debería ser una función', () => {
    expect(typeof signInUser).toBe('function');
  });
  it('Debería ingresar el email miau@gmail.com', () => signInUser('miau@gmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('miau@gmail.com');
    }));
});

describe('signOutUser', () => {
  it('debería ser una función', () => {
    expect(typeof signOutUser).toBe('function');
  });
  it('Debería poder salir de la sesion', () => signOutUser()
    .then((user) => {
      expect(user).toBe(undefined);
    }));
});

describe('currentUser', () => {
  it('debería ser una función', () => {
    expect(typeof currentUser).toBe('function');
  });
});

describe('onAuthStateChanged', () => {
  it('debería ser una función', () => {
    expect(typeof onAuthStateChanged).toBe('function');
  });
  it('debeía ser un observador', () => {
    const callback = () => {};
    onAuthStateChanged(callback);
    expect(callback).toEqual(callback);
  });
});
