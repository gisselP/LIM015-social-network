import { home } from './home.js';
import { signIn } from './signIn.js';
import { signUp } from './signUp.js';
import { pageOnlyCats } from './pageOnlyCats.js';
import { error } from './error404.js';

const components = {
  Home: home,
  SignIn: signIn,
  SignUp: signUp,
  OnlyCats: pageOnlyCats,
  Error: error,
};

export { components };
