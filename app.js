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
const flashcardContainer = document.querySelector("#contain-flashcards");
const noFlashcardMsg = document.querySelector("#contain-flashcards > p");

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
function validateForm(cardData) {
  if (cardData.question == "" || cardData.answer == "") {
    console.log("Error, invalid input");
    return false;
  }
  return true;
}

// add card data to flashcard array then close the modal
function saveCard(cardData) {
  if (validateForm(cardData)) flashcardArray.push(cardData);
  console.log(flashcardArray);
  closeCardCreationModal()
  displayFlashcard();
}

// append flashcard to flashcard container
function appendFlashcard() {
  flashcardArray.forEach(flashcard => {
    const card = document.createElement('div');
    card.className = 'flashcard';
    const html = 
    `<div class="card-face">
      <p class="tag">Question</p>
      <p class="card-content">${flashcard.question}</p>
    </div>
    <div class="card-face">
      <button class="tag button">Answer <i class="fa fa-chevron-down"></i></button>
      <p class="card-content">${flashcard.answer}</p>
    </div>
    <div class="actions">
      <i class="fa fa-edit"></i>
      <i class="fa fa-trash"></i>
    </div>`;
    card.innerHTML = html;
    card.style.display = 'block';
    flashcardContainer.appendChild(card);
  });
}

// display a flashcard for every card object in the array
function displayFlashcard() {
  if (flashcardArray.length === 0) return;

  noFlashcardMsg.style.display = 'none';
  flashcardContainer.innerHTML = '';
  appendFlashcard();
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
