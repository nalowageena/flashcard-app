// DOM Element Selectors
const welcomeAlert = document.querySelector(".welcome");
const closeWelcome = document.querySelector(".fa-close");
const flashcards = document.querySelectorAll(".flashcard");
const addFlashcardsBtn = document.querySelector("#add-flashcard-btn");
const cardCreationModal = document.querySelector("#card-creation-modal");
const cardCreationForm = document.querySelector("#card-creation-form");
const modalCloseBtn = document.querySelector("#modal-close-btn");
const cardForm = document.forms[0];
const flashcardContainer = document.querySelector("#contain-flashcards");
const noFlashcardMsg = document.querySelector("#contain-flashcards > p");
const textareas = document.querySelectorAll('textarea');
const formErrorMsgs = document.querySelectorAll('.form-section small');

let flashcardArray;

if (getLocalArray() !== null){
  flashcardArray = getLocalArray();
  loadFlashcards(flashcardArray);
}
else{
  flashcardArray = [];
}

// Event Listeners
closeWelcome.addEventListener("click", removeWelcomeAlert);
addFlashcardsBtn.addEventListener("click", showCardCreationModal);
cardCreationModal.addEventListener("click", closeCardCreationModal);
cardCreationForm.addEventListener("click", (e) => {
  e.stopPropagation(); // To prevent the modal from getting closed when the form is clicked
});
modalCloseBtn.addEventListener("click", closeCardCreationModal);
cardForm.addEventListener("submit", submitData);
textareas.forEach(textarea => {
  textarea.addEventListener("focus", focusTextarea);
});

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
  cardForm.reset();
  focusTextarea();
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
  const formQuestion = document.querySelector('textarea#question');
  const formAnswer = document.querySelector('textarea#answer');
  const quesErrorMsg = document.querySelector('#ques-error-msg');
  const ansErrorMsg = document.querySelector('#ans-error-msg');

  if (cardData.question == "" || cardData.answer == "") {
    console.log("Error, invalid input");

    if (cardData.question == "") {
      formQuestion.style.border = 'solid 3px red';
      quesErrorMsg.style.visibility = 'visible';
    }
    if (cardData.answer == "") {
      formAnswer.style.border = 'solid 3px red';
      ansErrorMsg.style.visibility = 'visible';
    }

    return false;
  }
  return true;
}

// Function to reset all form styling when the inputs are being focused on
function focusTextarea() {
  textareas.forEach(textarea => {
    textarea.style.border = 'solid 3px #808080';
  });

  formErrorMsgs.forEach(formErrorMsg => {
    formErrorMsg.style.visibility = 'hidden';
  });
}

// add card data to flashcard array then close the modal
function saveCard(cardData) {
  if (validateForm(cardData)) {
    flashcardArray.push(cardData);
    updateLocalStore(flashcardArray);
    console.log(flashcardArray);
    closeCardCreationModal()
    displayFlashcard();
  }
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
      <p class="card-content toggleAnswer">${flashcard.answer}</p>
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
  deleteCard();
  toggleAnswer()
}

// Function to delete card
function deleteCard() {
  const deleteBtns = document.querySelectorAll('.fa-trash');

  [...deleteBtns].forEach(deleteBtn => {
    deleteBtn.addEventListener('click', () => {
      const flashCardIndex = [...flashcardContainer.children].indexOf(deleteBtn.parentElement.parentElement);
      
      flashcardArray.splice(flashCardIndex, 1);
      updateLocalStore(flashcardArray);
      deleteBtn.parentElement.parentElement.remove();
      console.log(flashcardArray);

      if (flashcardArray.length === 0) {
        flashcardContainer.innerHTML = '<p>No flashcards here...</p>';
      }
    });
  });
}

function updateLocalStore(flashcardArray) {
  localStorage.setItem('flashcardArray', JSON.stringify(flashcardArray));
}

function getLocalArray() {
  return JSON.parse(localStorage.getItem('flashcardArray'))
}

function loadFlashcards(flashcardArray) {
  flashcardArray.forEach((flashcard) => {
    displayFlashcard()
  })
}

function toggleAnswer() {
  const toggleBtns = document.querySelectorAll('.tag.button');
  console.log(toggleBtns);
  [...toggleBtns].forEach(toggleBtn => {
    toggleBtn.addEventListener('click', () => {
      toggleBtn.querySelector('.fa').classList.toggle('fa-chevron-up');
      toggleBtn.querySelector('.fa').classList.toggle('fa-chevron-down');
      toggleBtn.closest('div').querySelector('p').classList.toggle('toggleAnswer');
    });
  });
}

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
