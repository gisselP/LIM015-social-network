/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-alert */
import { onAuthStateChanged, registerGoogle, signInUser } from '../firebase/firebase-auth.js';
import { userState } from './home.js';

export const signIn = () => {
  userState();
  const viewSignIn = `
  <section class='web-container'>
    <div class='home-container'>
      <figure class='container-img'>
        <img class='cat-gif' src='https://i.pinimg.com/originals/35/ce/9f/35ce9f85da291b4c1c504d8cbd37e8ee.gif'>
      </figure>
        <form id='signin-form' action=''>
          <div class="input-div one">
            <div class="icon-input">
              <i class="fas fa-user"></i>
            </div>
            <div class='div'>
              <input class='form-input' type='email' id='signin-email' placeholder=" "  autocomplete=off >
              <label class='form-label'>Email</label>
            </div>
          </div>
          <span class="error-email"></span>
          <div class="input-div one">
            <div class="icon-input">
              <i class="fas fa-lock"></i>
            </div>
            <div class='div'>
              <input class='form-input' type="password"  id="signin-password" placeholder=" " autocomplete=off >
              <label class='form-label'>Contraseña</label>
              <i class="far fa-eye"  id="form-eye" ></i>
            </div>
          </div>
          <p class="error-password"></p>
          <div class='form-div'>
            <input type="submit" id="start-button" class="form-button" value="Iniciar sesión">
          </div>
          <button class="form-button"> 
            <img class='google-icon' src='https://cdn-icons-png.flaticon.com/512/300/300221.png'>
            <a id="signin-google" href="#/google">Acceder con Google</a>
          </button>
          <div class="signin-access-items">
            <span>¿No tienes cuenta?</span><a class="sgn" href="#/signup">Create una</a>
          </div>
        </form>
    </div>
    <div>
      <img class="img-web" src="./img/gato-home.png">
    </div>
  </section>  `;

  const sectionElement = document.createElement('div');
  sectionElement.classList.add('container-box');
  sectionElement.innerHTML = viewSignIn;

  const eyebtn = sectionElement.querySelector('#form-eye');

  eyebtn.addEventListener('click', (e) => {
    e.preventDefault();
    const inputPassword = sectionElement.querySelector('#signin-password');
    const type = inputPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    inputPassword.setAttribute('type', type);
  });

  const signinBtm = sectionElement.querySelector('#start-button');
  signinBtm.addEventListener('click', (e) => {
    e.preventDefault();
    const signInEmail = sectionElement.querySelector('#signin-email').value;
    const signInPassword = sectionElement.querySelector('#signin-password').value;
    const errorEmail = sectionElement.querySelector('.error-email');
    const errorPassword = sectionElement.querySelector('.error-password');
    errorEmail.innerHTML = '';
    errorPassword.innerHTML = '';
    if (signInPassword === '' && signInEmail === '') {
      errorPassword.innerHTML = 'Inserte contraseña';
      errorEmail.innerHTML = 'Inserte email';
    } else if (signInPassword === '') {
      errorPassword.innerHTML = 'Inserte contraseña';
    } else if (signInEmail === '') {
      errorEmail.innerHTML = 'Inserte email';
    } else {
      /* ------------------------Confirmar la verificación del correo---------------------- */
      const checkEmailVerified = () => {
        onAuthStateChanged((user) => {
          if (user) {
            if (user.emailVerified) { // This will return true or false
              window.location.hash = '#/onlycats';
              localStorage.setItem('user', JSON.stringify(user));
            } else {
              swal('Email no verificado. Revisa tu correo :D');
            }
          }
        });
      };
      /* -----------------Ingresar con correo y contraseña---------------------- */
      signInUser(signInEmail, signInPassword)
        .then(() => checkEmailVerified())
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === 'auth/user-not-found') {
            errorEmail.innerHTML = 'El usuario no existe';
          } else if (errorCode === 'auth/wrong-password') {
            errorPassword.innerHTML = 'La contraseña es inválida o el usuario no tiene contraseña';
          }
        });
    }
  });
  /* ----------------------------- Ingresar con Google--------------------- */
  const signInGoogle = sectionElement.querySelector('#signin-google');
  signInGoogle.addEventListener('click', (e) => {
    e.preventDefault();
    registerGoogle()
      .then((userAccount) => {
        window.location.hash = '#/onlycats';
        localStorage.setItem('user', JSON.stringify(userAccount.user));
      })
      .catch((error) => error);
  });
  return sectionElement;
};
