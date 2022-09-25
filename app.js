// DOM Element Selectors
const welcomeAlert = document.querySelector('.welcome');
const closeWelcome = document.querySelector('.fa-close');
const deletebtns = document.querySelectorAll('.fa-trash');
const flashcards = document.querySelectorAll('.flashcard')

// Event Listeners
closeWelcome.addEventListener('click', removeWelcomeAlert); // It is better to seperate the event listeners from the functions so as to keep everything neat and organised - ONCE YOU'VE READ THIS, PLS DELETE THE COMMENT.

function removeWelcomeAlert() {
  welcomeAlert.style.opacity = 0;
  setTimeout(() => {  welcomeAlert.style.display = 'none'; }, 400);
}

// FOR NOW, LET'S DISABLE THE DELETE BTNS - 
// Array.from(deletebtns).forEach(btn =>{
//     btn.addEventListener('click', ()=>{
//         let card = btn.parentElement.parentElement;
//         setTimeout(() => {  card.style.display = 'none'; }, 400);
//     })
// });