// DOM Element Selectors
const welcomeAlert = document.querySelector(".welcome");
const closeWelcome = document.querySelector(".fa-close");
const deleteBtns = document.querySelectorAll(".fa-trash");
const flashcards = document.querySelectorAll(".flashcard");
const addFlashcardsBtn = document.querySelector("#add-flashcard-btn");
const cardCreationModal = document.querySelector("#card-creation-modal");
const cardCreationForm = document.querySelector("#card-creation-form");
const modalCloseBtn = document.querySelector("#modal-close-btn");
const cardForm = document.forms[0];

const flashcardArray = [];

// Event Listeners
closeWelcome.addEventListener("click", removeWelcomeAlert);
addFlashcardsBtn.addEventListener("click", showCardCreationModal);
cardCreationModal.addEventListener("click", closeCardCreationModal);
cardCreationForm.addEventListener("click", (e) => {
  e.stopPropagation(); // To prevent the modal from getting closed when the form is clicked
});
modalCloseBtn.addEventListener("click", closeCardCreationModal);
cardForm.addEventListener("submit", submitData);

// Function to remove welcome alert when its close button is clicked
function removeWelcomeAlert() {
  welcomeAlert.style.opacity = 0;
  setTimeout(() => {
    welcomeAlert.style.display = "none";
  }, 400);
}

// Function to show card creation modal
function showCardCreationModal() {
  cardCreationModal.style.display = "flex";
}

// Function to hide card creation modal
function closeCardCreationModal() {
  cardCreationModal.style.display = "none";
}

// Function to create flashcard objects on submit
function submitData(event) {
  event.preventDefault(); //prevent the form from reloading after the submit button is clicked - which is the default behavior.
  const cardData = new FormData(event.target);
  const cardDataObj = new FLashcard();
  cardData.forEach((value, key) => (cardDataObj[key] = value));
  saveCard(cardDataObj);
}

// if any input field is left empty displays an error
function formValidation(cardData) {
  if (cardData.question == "" || cardData.answer == "") {
    console.log("Error, invalid input");
    return false;
  }
  return true;
}

// add card data to flashcard array then close the modal
function saveCard(cardData) {
  if (formValidation(cardData)) flashcardArray.push(cardData);
  console.log(flashcardArray);
  closeCardCreationModal()
}

// FOR NOW, LET'S DISABLE THE DELETE BTNS
// Array.from(deleteBtns).forEach(btn =>{
//     btn.addEventListener('click', ()=>{
//         let card = btn.parentElement.parentElement;
//         setTimeout(() => {  card.style.display = 'none'; }, 400);
//     })
// });

// flashcard constructor and prototype
let FLashcard = function (question, answer) {
  this.question = question;
  this.answer = answer;
};
FLashcard.prototype = {
  constructor: FLashcard,
  getQuestion: function () {
    return question;
  },
  getAnswer: function () {
    return this.answer;
  },
};
