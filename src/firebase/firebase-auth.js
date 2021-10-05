// Sign up with Email and password:
export const createUser = (email, password) => firebase.auth()
  .createUserWithEmailAndPassword(email, password);

// Sign up with Google:
export const registerGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(googleProvider);
};

// Email Verification:
export const emailVerification = () => firebase.auth()
  .currentUser.sendEmailVerification();

// Sign in:
export const signInUser = (email, password) => firebase.auth()
  .signInWithEmailAndPassword(email, password);

// Sign out
export const signOutUser = () => firebase.auth().signOut();

// Current user:
export const currentUser = () => firebase.auth().currentUser;

// OnAuthStateChanged
export const onAuthStateChanged = (callback) => firebase.auth().onAuthStateChanged(callback);
