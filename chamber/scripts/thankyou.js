const params = new URLSearchParams(window.location.search);
const details = document.querySelector('#application-details');
const fields = [
  { name: 'first', label: 'First name' },
  { name: 'last', label: 'Last name' },
  { name: 'email', label: 'Email' },
  { name: 'phone', label: 'Mobile phone' },
  { name: 'organization', label: 'Business or organization' },
  { name: 'membership', label: 'Membership level' },
  { name: 'timestamp', label: 'Form loaded at (UTC)' }
];

if (!params.has('first')) {
  details.textContent = 'Please complete the application form to see your details.';
} else {
  fields.forEach((field) => {
    const paragraph = document.createElement('p');
    paragraph.textContent = `${field.label}: ${params.get(field.name) || 'Not provided'}`;
    details.appendChild(paragraph);
  });
}
