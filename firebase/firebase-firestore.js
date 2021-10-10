export const postCollection = (post, userName, photoUser, email, uid, photoURL) => firebase.firestore().collection('posts').add({
  text: post,
  user: userName,
  photoUser,
  email,
  uid,
  postImage: photoURL,
  likes: [],
  timePost: firebase.firestore.FieldValue.serverTimestamp(),
});

// Función para traer la postCollection
export const getCollection = () => firebase.firestore().collection('posts').orderBy('timePost', 'desc');

// Función para traer todos los posts de firestore
export const getPost = (id) => firebase.firestore().collection('posts').doc(id).get();

// Función que crea la colección de usuarios
export const postUserCollection = (usuario, email) => firebase.firestore().collection('user').add({
  usuario,
  email,
});

// Función que trae la collección de usuarios
export const getUserCollection = () => firebase.firestore().collection('user');

// Función para eliminar posts
export const deletePost = (id) => firebase.firestore().collection('posts').doc(id).delete();

// Función para editar posts
export const editPost = (id, text) => firebase.firestore().collection('posts').doc(id).update({ text });

// Función para agregar y quitar likes
export const editLike = (id, likes) => firebase.firestore().collection('posts').doc(id).update({ likes });
