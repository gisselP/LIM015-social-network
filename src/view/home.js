import { onAuthStateChanged } from '../firebase/firebase-auth.js';

export const userState = () => {
  onAuthStateChanged((user) => {
    if (user !== null && user.emailVerified) {
      window.location.hash = '#/onlycats';
    }
  });
};
export const home = () => {
  userState();
  const viewHome = `
    <section class="web-container">
      <div class="home-container">
        <figure>
          <img src="./img/only-cats.png" "alt='only-cats' class="home-img">
        </figure>
        <p class="home-info">
          Conecta con otras personas amantes de los gatos en una web completamente tematizada.
          Comparte experiencias, fotos y más. Únete.
        </p>
        <nav>
          <div class="home-items">
            <a href="#/signin" class="links-items">Iniciar Sesión</a>
          </div>
          <div class="home-items">
            <a href="#/signup" class="links-items">Regístrate</a>
          </div>
        </nav>
      </div>
      <div>
        <img class="img-web" src="./img/gato-home.png">
      </div>
    </section>
    `;
  const divElement = document.createElement('div');
  divElement.classList.add('container-box');
  divElement.innerHTML = viewHome;
  return divElement;
};
