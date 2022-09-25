// DOM Element Selectors
const welcomeAlert = document.querySelector('.welcome');
const closeWelcome = document.querySelector('.fa-close');
const deleteBtns = document.querySelectorAll('.fa-trash');
const flashcards = document.querySelectorAll('.flashcard')
const addFlashcardsBtn = document.querySelector('#add-flashcard-btn');
const cardCreationModal = document.querySelector('#card-creation-modal');
const cardCreationForm = document.querySelector('#card-creation-form');
const modalCloseBtn = document.querySelector('#modal-close-btn');

// Event Listeners
closeWelcome.addEventListener('click', removeWelcomeAlert); // It is better to seperate the event listeners from the functions so as to keep everything neat and organised - ONCE YOU'VE READ THIS, PLS DELETE THE COMMENT.
addFlashcardsBtn.addEventListener('click', showCardCreationModal);
cardCreationModal.addEventListener('click', closeCardCreationModal);
cardCreationForm.addEventListener('click', e => {
  e.stopPropagation(); // To prevent the modal from getting closed when the form is clicked
});
modalCloseBtn.addEventListener('click', closeCardCreationModal);

// Function to remove welcome alert when its close button is clicked
function removeWelcomeAlert() {
  welcomeAlert.style.opacity = 0;
  setTimeout(() => {  welcomeAlert.style.display = 'none'; }, 400);
}

// Function to show card creation modal
function showCardCreationModal() {
  cardCreationModal.style.display = 'flex';
}

// Function to hide card creation modal
function closeCardCreationModal() {
  cardCreationModal.style.display = 'none';
}

// FOR NOW, LET'S DISABLE THE DELETE BTNS
// Array.from(deleteBtns).forEach(btn =>{
//     btn.addEventListener('click', ()=>{
//         let card = btn.parentElement.parentElement;
//         setTimeout(() => {  card.style.display = 'none'; }, 400);
//     })
// });