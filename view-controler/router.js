import { components } from '../view/index.js';

const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (route) {
    case '':
    case '#/': container.appendChild(components.Home());
      break;
    case '#/signin': container.appendChild(components.SignIn());
      break;
    case '#/signup': container.appendChild(components.SignUp());
      break;
    case '#/onlycats': container.appendChild(components.OnlyCats());
      break;
    default: container.appendChild(components.Error());
  }
  return container;
};

export { changeView };
