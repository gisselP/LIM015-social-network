/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable no-console */
import { createUser, emailVerification, currentUser } from '../firebase/firebase-auth.js';
import { userState } from './home.js';
import { postUserCollection } from '../firebase/firebase-firestore.js';

export const signUp = () => {
  userState();
  const sectionElement = document.createElement('section');
  const viewSignUp = `
  <section class='web-container'>
    <div  class="home-container">
      <h2 class="signup-register">Regístrate</h2>
      <form id="signup-form" class="signin-form">
        <div class="input-div one">
            <div class="icon-input">
              <i class="fas fa-user"></i>
            </div>
            <div class='div'>
              <input class='form-input' type='text' id="signup-username" placeholder=" "  autocomplete=off required>
              <label class='form-label'>Usuario</label>
            </div>
        </div>
          <span class="error-username"></span>
        <div class="input-div one">
          <div class="icon-input">
            <i class="fas fa-user"></i>
          </div>
          <div class='div'>
            <input class='form-input' type='email' id="signup-email" placeholder=" "  autocomplete=off required>
            <label class='form-label'>Correo electronico</label>
          </div>
        </div>
        <span class="error-email"></span>
        <div class="input-div one">
          <div class="icon-input">
            <i class="fas fa-lock"></i>
          </div>
          <div class='div'>
            <input class='form-input' type='password' id="signup-password" placeholder=" "  autocomplete=off required>
            <label class='form-label'>Contraseña</label>
            <i class="far fa-eye" id="form-eye"></i>
          </div>
        </div>
        <span class="error-password"></span>
        <div class='form-div'>
          <input type="submit" id="create-account"" class="form-button" value="Crear cuenta">
        </div>
        <div class="signin-access-items">
          <span>¿Tienes cuenta?</span><a class="sgn" href="#/signin"> Inicia con ella</a>
        </div>
      </form>
    </div>
    <div>
      <img class="img-web" src="./img/gato-home.png">
    </div>
  </section>`;

  sectionElement.classList.add('container-box');
  sectionElement.innerHTML = viewSignUp;
  const eyebtn = sectionElement.querySelector('#form-eye');
  eyebtn.addEventListener('click', (e) => {
    e.preventDefault();
    const inputPassword = sectionElement.querySelector('#signup-password');
    const type = inputPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    inputPassword.setAttribute('type', type);
  });
  /* ------------------------------Registrar con correo y contraseña ---------------------- */
  const signupForm = sectionElement.querySelector('#create-account');
  signupForm.addEventListener('click', (e) => {
    e.preventDefault();
    const signupUsername = sectionElement.querySelector('#signup-username').value;
    const signupEmail = sectionElement.querySelector('#signup-email').value;
    const signupPassword = sectionElement.querySelector('#signup-password').value;
    const errorEmail = sectionElement.querySelector('.error-email');
    const errorPassword = sectionElement.querySelector('.error-password');

    errorEmail.innerHTML = '';
    errorPassword.innerHTML = '';
    if (signupPassword === '' && signupEmail === '') {
      errorPassword.innerHTML = 'Inserte contraseña';
      errorEmail.innerHTML = 'Inserte email';
    } else if (signupPassword === '') {
      errorPassword.innerHTML = 'Inserte contraseña';
    } else if (signupEmail === '') {
      errorEmail.innerHTML = 'Inserte email';
    } else {
      createUser(signupEmail, signupPassword)
        .then(() => {
          emailVerification().then(() => {
            swal('La verificación ha sido enviada.');
            window.location.hash = '#/signin';
            const user = currentUser();
            console.log(user);
            user.updateProfile({
              displayName: signupUsername,
              bio: 'j',
            }).then(() => {
            }).catch((error) => error);

            postUserCollection(signupUsername, signupEmail)
              .then(() => {
              })
              .catch((error) => {
                console.error('Error adding document: ', error);
              });
          })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === 'auth/email-already-in-use') {
            errorEmail.innerHTML = 'El correo electrónico ya está en uso.';
          } else if (errorCode === 'auth/weak-password') {
            errorPassword.innerHTML = 'La contraseña es muy débil.';
          }
        });
    }
  });

  return sectionElement;
};
