// Tableau pour stocker les contacts
const contacts = [];

// Récupération des éléments du DOM nécessaires
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const contactForm = document.getElementById('contactForm');
const lastNameInput = document.getElementById('lastName');
const firstNameInput = document.getElementById('firstName');
const emailInput = document.getElementById('email');
const addressInput = document.getElementById('address');
const submitBtn = document.getElementById('submitBtn');
const toast = document.getElementById('toast');
const contactsDiv = document.getElementById('contacts');

// Affiche un message temporaire (toast) en haut à droite
function showToast(msg) {
  toast.textContent = msg;
  toast.style.display = 'block';
  setTimeout(() => toast.style.display = 'none', 2000);
}

// Ouvre le pop-in pour ajouter un contact
openModalBtn.onclick = () => {
  modal.style.display = 'flex';
  contactForm.reset();
  validateForm();
};

// Ferme le pop-in
closeModalBtn.onclick = () => modal.style.display = 'none';

// Fonction de validation globale du formulaire
function validateForm() {
  const emailValid = /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailInput.value);
  const lastNameFilled = lastNameInput.value.trim() !== '';
  const firstNameFilled = firstNameInput.value.trim() !== '';
  const addressFilled = addressInput.value.trim() !== '';
  const isValid = emailValid && lastNameFilled && firstNameFilled && addressFilled;
  submitBtn.disabled = !isValid;
}

// Validation sur tous les champs du formulaire
emailInput.oninput = validateForm;
lastNameInput.oninput = validateForm;
firstNameInput.oninput = validateForm;
addressInput.oninput = validateForm;

// Gestion de la soumission du formulaire d'ajout de contact
contactForm.onsubmit = function(e) {
  e.preventDefault();
  const contact = {
    email: emailInput.value,
    address: addressInput.value,
    last_name: lastNameInput.value,
    first_name: firstNameInput.value,
  };

  fetch('http://127.0.0.1:8000/contact/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact)
  })
  .then(response => {
    if (!response.ok) return response.json().then(err => { throw err; });
    return response.json();
  })
  .then(data => {
    contacts.push({ ...contact, ip: data.ip || '127.0.0.1', editing: false });
    showToast('Contact ajouté avec succès');
    renderContacts();
    modal.style.display = 'none';
  })
  .catch(() => showToast('Erreur lors de l\'ajout du contact'));
};

// Appelle la validation au chargement de la page pour initialiser l'état du bouton
validateForm();