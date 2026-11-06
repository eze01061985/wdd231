const menuButton = document.querySelector('#menu-button');
const navigation = document.querySelector('#navigation');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.classList.toggle('show');
  navigation.classList.toggle('show');
  menuButton.setAttribute('aria-expanded', isOpen);
});
