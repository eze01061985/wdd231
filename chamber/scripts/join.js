document.querySelector('#timestamp').value = new Date().toISOString();

document.querySelectorAll('[data-dialog]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector(`#${link.dataset.dialog}`).showModal();
  });
});

document.querySelectorAll('.membership-dialog').forEach((dialog) => {
  dialog.querySelector('.close-dialog').addEventListener('click', () => {
    dialog.close();
  });
  dialog.addEventListener('click', (event) => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog &&
        (event.clientX < bounds.left || event.clientX > bounds.right ||
         event.clientY < bounds.top || event.clientY > bounds.bottom)) {
      dialog.close();
    }
  });
});
