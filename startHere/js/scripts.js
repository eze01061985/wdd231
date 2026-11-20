const params = new URLSearchParams(window.location.search);
const results = document.querySelector('#results');
const fields = [
  { name: 'first', label: 'First name' },
  { name: 'last', label: 'Last name' },
  { name: 'phone', label: 'Cell phone' },
  { name: 'email', label: 'Email' },
  { name: 'ordinance', label: 'Ordinance' },
  { name: 'date', label: 'Date' },
  { name: 'location', label: 'Location' }
];

if (params.size === 0) {
  results.textContent = 'Please complete the form to see your appointment details.';
} else {
  fields.forEach((field) => {
    const paragraph = document.createElement('p');
    const value = params.get(field.name) || 'Not provided';
    paragraph.textContent = `${field.label}: ${value}`;
    results.appendChild(paragraph);
  });
}
