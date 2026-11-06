const membersContainer = document.querySelector('#members');
const statusMessage = document.querySelector('#status');
const gridButton = document.querySelector('#grid-button');
const listButton = document.querySelector('#list-button');

async function getMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    const members = await response.json();
    displayMembers(members);
    statusMessage.textContent = `${members.length} members in the directory`;
  } catch (error) {
    console.error(error);
    statusMessage.textContent = 'The directory could not load. Please try again later.';
  }
}

function displayMembers(members) {
  const levels = ['Member', 'Silver member', 'Gold member'];
  members.forEach(member => {
    const card = document.createElement('section');
    card.classList.add('member');
    card.innerHTML = `
      <h2>${member.name}</h2>
      <p class="description">${member.description}</p>
      <img src="images/${member.image}" alt="${member.name} logo" width="96" height="96" loading="lazy">
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <p class="level">${levels[member.membershipLevel - 1]}</p>
      <a href="${member.website}" aria-label="Example website for ${member.name}">Website</a>`;
    membersContainer.appendChild(card);
  });
}

gridButton.addEventListener('click', () => {
  membersContainer.className = 'grid';
  gridButton.setAttribute('aria-pressed', 'true');
  listButton.setAttribute('aria-pressed', 'false');
});

listButton.addEventListener('click', () => {
  membersContainer.className = 'list';
  gridButton.setAttribute('aria-pressed', 'false');
  listButton.setAttribute('aria-pressed', 'true');
});

getMembers();
