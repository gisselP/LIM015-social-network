/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable no-console */
import { signOutUser, onAuthStateChanged } from '../firebase/firebase-auth.js';
import {
  postCollection, getCollection, deletePost, getPost, editPost, editLike,
} from '../firebase/firebase-firestore.js';

const userStateCheck = () => {
  onAuthStateChanged((user) => {
    if (user !== null && user.emailVerified) {
      window.location.hash = '#/onlycats';
    } else if (user === null) {
      window.location.hash = '';
    }
  });
};

export const pageOnlyCats = () => {
  userStateCheck();
  const imgDefault = 'https://pbs.twimg.com/profile_images/1101458340318568448/PpkA2kQh_400x400.jpg';
  const localUser = JSON.parse(localStorage.getItem('user'));
  const photo = (localUser.photoURL === null) ? imgDefault : localUser.photoURL;
  const displayName = localUser.displayName;
  const email = localUser.email;
  const uid = localUser.uid;
  let id = ' ';
  let editStatus = false;
  const pageOcView = `
  <div class="page-container">
    <header class = "header-container">
      <img src="./img/only-cats.png" "alt='only-cats' class="page-title">
      <i class="fas fa-sign-out-alt" id="sign-out"></i>
      <i class="fas fa-cat" style="display:none"></i>
    </header>
    <main class = "main-container" >
      <div class="label-container">
      <p class="label-name"> ¿Qué ver? </p>
          <button class="label-btn meme"><img src="./img/memecat.png" alt="memes" class="img-memes" />Memes</button>
          <button class="label-btn vet"><img src="./img/vetcat.png" alt="memes" class="img-memes" />Vet Cat</button>
          <button class="label-btn foodie"><img src="./img/foodiecat.png" alt="memes" class="img-memes" />Foodie Cat</button>
      </div>

      <div class="scroll-container">
        <section class="profile-post publish" >
          <div class="container-photo">
              <img src="${photo}" "alt='picture' class="profile-photo">
          </div>
          <section class="section-profile" >
            <textarea class="text-input" id="text-input" placeholder="¿Miau esta pasando?"></textarea>
            <div class="post-icon">
              <i class="fas fa-image"></i>
              <button class="post-button hide" id="cancel-button" type="submit">Cancelar</button>
              <button class="post-button" id="post-button" type="submit">Meow</button>
            </div>
          </section>
        </section>

        <section  id="other-post">
        </section>

      </div>
      <div class="profile-container">
      <div class="container-fondo">
          <img src="./img/profile.png" "alt='fondo' class="profile-fondo">
        </div>
        <div class="container-photo">
          <img src="${photo}" "alt='picture' class="profile-photo">
        </div>
       <p class="name-input"> ${localUser.displayName} </p>
       <p class="name-input"> ${email} </p>
        <p class="biography-name"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <button class="profile-btn" id="profile-btn">Editar Perfil</button>
      </div>
    </main>
  </div>`;

  const sectionElement = document.createElement('section');
  sectionElement.classList.add('container-box');
  sectionElement.innerHTML = pageOcView;
  // -----Botones del Post
  const btnPublish = sectionElement.querySelector('#post-button');
  const textInput = sectionElement.querySelector('#text-input');

  // -------- Leer Posts (R) --------

  const readPosts = () => {
    getCollection().onSnapshot((querySnapshot) => {
      const newPost = sectionElement.querySelector('#other-post');
      newPost.innerHTML = ' ';
      querySnapshot.forEach((doc) => {
        const dataContent = doc.data();
        dataContent.id = doc.id;
        newPost.innerHTML += `
        <section class="profile-post">
          <div class="container-photo">
            <img src="${dataContent.photo}" "alt='picture' class="profile-photo">
          </div>
          <section class="section-post">
            <p class="name-input"> ${dataContent.user} </p>
            <p readonly class="text-output">${dataContent.text}</p>
            <div class="likes-container">
              <i class="far fa-heart" id="${dataContent.id}"></i>
              <span>${dataContent.likes.length} </span>
            </div>
          </section>
          <div class="update-post  ${(dataContent.email === localUser.email) ? ' ' : 'hide'}">
            <button class="btn-delete"><i class="fas fa-trash" id="${doc.id}"></i></button>
            <button class="btn-edit"><i class="fas fa-edit" id="${doc.id}"></i></button>
          </div>
          
        </section> `;
      });

      // -------- Eliminar Posts (D) --------
      const btnDelete = sectionElement.querySelectorAll('.btn-delete');
      btnDelete.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          const result = confirm('¿En serio quieres borrar el post?');
          if (result === true) {
            await deletePost(e.target.id);
            console.log('Document successfully deleted!');
            window.alert('¡El post ha sido borrado con éxito!');
          }
        });
      });

      // -------- Editar Posts (U) --------
      const btnEdit = sectionElement.querySelectorAll('.btn-edit');
      btnEdit.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          const postSeleccionado = await getPost(e.target.id);
          // Para saber lo que dice el post => console.log(postText.value);
          textInput.value = postSeleccionado.data().text;
          editStatus = true;
          // data del post => console.log(postSeleccionado);
          // id del post => console.log(postSeleccionado.id);
          id = postSeleccionado.id;
          btnPublish.innerText = 'Editar';
          sectionElement.querySelector('.hide').style.display = 'block';
          // console.log(x);
        });
      });

      // -------- like Posts  --------
      const btnHeart = sectionElement.querySelectorAll('.fa-heart');
      btnHeart.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          getPost(e.target.id)
          /* .then((res) => {
              const arrayLike = res.data().likes;
              const statusLike = arrayLike.indexOf(localUser.uid);
              if (statusLike === -1) {
                arrayLike.push(localUser.uid);
                console.log(statusLike);
                editLike(res.id, arrayLike)
                  .then(() => console.log('se logró')).catch((error) => console.log(error));
              } else if (statusLike === 0) {
                if (statusLike !== -1) {
                  arrayLike.splice(arrayLike, 1);
                }
                console.log(statusLike);
                editLike(res.id, arrayLike)
                  .then(() => console.log('se quitó')).catch((error) => console.log(error));
              }
            }).catch((error) => console.log(error)); */
            .then((res) => {
              const arrayLike = res.data().likes;
              if (arrayLike.includes(localUser.uid) === false) {
                arrayLike.push(localUser.uid);
                editLike(res.id, arrayLike)
                  .then(() => console.log('se logró')).catch((error) => console.log(error));
              } else {
                const arrayLikeFilter = arrayLike.filter((link) => link !== localUser.uid);
                editLike(res.id, arrayLikeFilter)
                  .then(() => console.log('se quitó')).catch((error) => console.log(error));
              }
            }).catch((error) => console.log(error));
        });
      });
    });
  };

  btnPublish.addEventListener('click', async () => {
    // EditStatus sera falso cuando no exista un post, y recien se este creando
    if (textInput.value.length !== 0) {
      if (editStatus === false) {
        // -------- Crear Posts (C) --------
        await postCollection(textInput.value, displayName, photo, email, uid);
        textInput.value = ' ';
      } else {
        await editPost(id, textInput.value);
        textInput.value = ' ';
        console.log('editanding');
        btnPublish.innerText = 'Meow';
        sectionElement.querySelector('.hide').style.display = 'none';
      }
    } else if (textInput.value.length === 0) {
      alert('pon un texto oye');
    }
  });
  readPosts();

  // ------------------ Salir de la página --------------------
  const signOut = sectionElement.querySelector('#sign-out');
  signOut.addEventListener('click', (e) => {
    e.preventDefault();
    const result = confirm('¿En serio quieres salir?');
    if (result === true) {
      signOutUser()
        .then(() => {
          window.location.hash = '';
          window.localStorage.clear();
        });
    }
  });

  return sectionElement;
};
