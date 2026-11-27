import { places } from '../data/places.mjs';

const gallery = document.querySelector('#places');
const dialog = document.querySelector('#place-dialog');

places.forEach((place) => {
  const card = document.createElement('article');
  card.className = 'place-card';
  card.innerHTML = `
    <h2>${place.name}</h2>
    <figure><img src="${place.image}" alt="${place.name} in San Salvador de Jujuy" width="300" height="200" loading="lazy"></figure>
    <address>${place.address}</address>
    <p>${place.description}</p>
    <button type="button" aria-label="Learn more about ${place.name}">Learn more</button>`;
  card.querySelector('button').addEventListener('click', () => {
    document.querySelector('#place-title').textContent = place.name;
    document.querySelector('#place-details').textContent = place.details;
    dialog.showModal();
  });
  gallery.appendChild(card);
});

document.querySelector('#close-place').addEventListener('click', () => {
  dialog.close();
});

function showVisitMessage() {
  const message = document.querySelector('#visit-message');
  const now = Date.now();
  try {
    const previousVisit = Number(localStorage.getItem('discover-last-visit'));
    const days = Math.floor((now - previousVisit) / 86400000);
    if (!previousVisit) {
      message.textContent = 'Welcome! Let us know if you have any questions.';
    } else if (days < 1) {
      message.textContent = 'Back so soon! Awesome!';
    } else {
      message.textContent = `You last visited ${days} ${days === 1 ? 'day' : 'days'} ago.`;
    }
    localStorage.setItem('discover-last-visit', now);
  } catch {
    message.textContent = 'Welcome! Let us know if you have any questions.';
  }
}

showVisitMessage();
