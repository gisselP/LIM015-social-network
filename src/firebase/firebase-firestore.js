export const postCollection = (post, userName, photo) => firebase.firestore().collection('posts').add({
  user: userName,
  text: post,
  photo,
  timePost: firebase.firestore.FieldValue.serverTimestamp(),
});

// Falta agregar el tiempo descendente
export const getCollection = () => firebase.firestore().collection('posts').orderBy('timePost', 'desc');

export const postUserCollection = (usuario, email) => firebase.firestore().collection('user').add({
  usuario,
  email,
});
export const getUserCollection = () => firebase.firestore().collection('user');

export const deletePost = (id) => firebase.firestore().collection('posts').doc(id).delete();
