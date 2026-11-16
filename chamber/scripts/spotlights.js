async function loadSpotlights() {
  const container = document.querySelector('#spotlights');
  const status = document.querySelector('#spotlight-status');
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('Could not load members.');
    const members = await response.json();
    const eligible = members.filter((member) => member.membershipLevel >= 2);
    for (let count = 0; count < 3 && eligible.length > 0; count++) {
      const index = Math.floor(Math.random() * eligible.length);
      const member = eligible.splice(index, 1)[0];
      const level = member.membershipLevel === 3 ? 'Gold' : 'Silver';
      const card = document.createElement('article');
      card.className = 'member';
      card.innerHTML = `
        <h3>${member.name}</h3>
        <img src="images/${member.image}" alt="${member.name} logo" width="96" height="96" loading="lazy">
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <p class="level">${level} member</p>
        <a href="${member.website}">Visit ${member.name}</a>
      `;
      container.appendChild(card);
    }
    status.textContent = '';
  } catch (error) {
    status.textContent = 'Member spotlights are unavailable. Please try again later.';
  }
}

loadSpotlights();
