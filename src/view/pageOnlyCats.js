/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
/* eslint-disable no-alert */
import { signOutUser } from '../firebase/firebase-functions.js';
import { postCollection, getCollection } from '../firebase/firebase-firestore.js';

export const pageOnlyCats = () => {
  const pageOcView = `
  <div class="page-container">
    <header class = "header-container">
      <img src="./img/only-cats.png" "alt='only-cats' class="page-title">
    </header>

    <main class ="background-posts">

        <section class="profile-post">
          <div class="container-photo">
              <img src="./img/michael.jpg" "alt='picture' class="profile-photo">
          </div>
          <section class="section-profile" >
            <p class="name-input"> Michael Scott </p>
            <textarea class="text-input" id="text-input"></textarea>
            <div>
              <button class="post-button" id="post-button" type="submit">Publicar</button>
            </div>
          </section>
        </section>


      <article class ="white-container" >
        <section class="scroll-container" id="other-post"></section>
      <article>

    </main>

    <aside >
        <button class="sign-out"> salir</button>
    </aside>
  </div>`;
  const sectionElement = document.createElement('section');
  sectionElement.classList.add('container-box');
  sectionElement.innerHTML = pageOcView;

  const btnPublish = sectionElement.querySelector('#post-button');
  const textInput = sectionElement.querySelector('#text-input');

  // -------- Crear Posts --------
  const writePost = () => {
  /*    textInput.innerHTML = ' '; */
    const post = textInput.value;
    postCollection(post)
      .then(() => {
        textInput.value = ' ';
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  };

  // -------- Leer Posts --------

  // const mostrarPosts = () => getCollection().onSnapshot((collection) => {
  // const newPost = sectionElement.querySelector('#other-post');
  // collection.forEach((doc) => {
  const mostrarPosts = () => {
    getCollection().onSnapshot((querySnapshot) => {
      const newPost = sectionElement.querySelector('#other-post');
      newPost.innerHTML = ' ';
      querySnapshot.forEach((doc) => {
        // const dataContent = doc.data().text;
        const dataContent = doc.data();
        newPost.innerHTML += `
        <section class="container-post">
          <div class="container-photo">
            <img src="./img/michael.jpg" "alt='picture' class="profile-photo">
          </div>
          <section class="section-post">
            <p class="name-input"> Michael Scott</p>
            <textarea readonly class="text-output">${dataContent.text}</textarea>
          </section>
        </section> `;
      });
    });
  };

  btnPublish.addEventListener('click', writePost);
  mostrarPosts();
  // -------- Publicar Posts --------
  /*   const publishPosts = () => {
    getCollection().get().then((querySnapshot) => {
      const newPost = sectionElement.querySelector('#other-post');
      querySnapshot.forEach((doc) => {
        newPost.innerHTML = ' ';
        console.log(`${doc.id} => ${doc.data().text}`);
        newPost.innerHTML += `
        <section class="container-photo">
        <img src="./img/michael.jpg" "alt='picture' class="profile-photo">
      </div>
      <section class="section-post">
        <p class="name-input"> Michael Scott</p>
        <div class="text-output">${doc.data().text}</div>
        <div>
        </div>
      </section>
      `;
      });
    });
  };
  publishPosts();
 */
  const signOut = sectionElement.querySelector('.sign-out');
  signOut.addEventListener('click', (e) => {
    e.preventDefault();
    const result = confirm('¿En serio quieres salir?');
    if (result === true) {
      signOutUser()
        .then(() => {
          window.location.hash = '#/';
        });
    } else {
      signOutUser()
        .catch((error) => (error));
    }
  });

  return sectionElement;
};
