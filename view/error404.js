export const error = () => {
  const viewError = `
  <div class="home-container">
  <h1 class="message-error"> Ups ...</h1><br>
  <h2 class="message-error">No se encontro la página</h2><br>
  <figure class="container-error">
  <img src='https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/silly-astronaut-cat-404-error-delf-design.jpg' class="cat-error">
  </figure>
  </div>
  `;
  const divElement = document.createElement('div');
  divElement.classList.add('container-box');
  divElement.innerHTML = viewError;
  return divElement;
};
