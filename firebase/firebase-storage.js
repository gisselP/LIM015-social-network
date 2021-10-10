export const uploadPostImage = (name, photo) => firebase.storage()
  .ref().child(`posts/${name}`).put(photo);
export const getPostImageURL = (dir, name) => firebase.storage()
  .refFromURL(`gs://onlycats-f46fa.appspot.com/${dir}/${name}`).getDownloadURL();
export const deletePostImage = (name, photo) => firebase.storage()
  .ref().child(`posts/${name}`).delete(photo);
