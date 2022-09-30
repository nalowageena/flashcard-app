// DOM Element Selectors
const welcomeAlert = document.querySelector(".welcome");
const closeWelcome = document.querySelector(".fa-close");
const flashcards = document.querySelectorAll(".flashcard");
const addFlashcardsBtn = document.querySelector("#add-flashcard-btn");
const createCardModal = document.querySelector("#create-card-modal");
const createCardForm = document.querySelector("#create-card-form");
const createModalCloseBtn = document.querySelector("#create-modal-close-btn");
const editCardModal = document.querySelector("#edit-card-modal");
const editCardForm = document.querySelector("#edit-card-form");
const editModalCloseBtn = document.querySelector("#edit-modal-close-btn");
const createForm = document.forms[0];
const editForm = document.forms[1];
const flashcardContainer = document.querySelector("#contain-flashcards");
const noFlashcardMsg = document.querySelector("#contain-flashcards > p");
const createCardTextareas = document.querySelectorAll('.create-card-textarea');
const createFormErrorMsgs = document.querySelectorAll('.create-form-section small');
const editCardTextareas = document.querySelectorAll('.edit-card-textarea');
const editFormErrorMsgs = document.querySelectorAll('.edit-form-section small');

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
addFlashcardsBtn.addEventListener("click", showCreateCardModal);
createCardModal.addEventListener("click", closeCreateCardModal);
editCardModal.addEventListener("click", closeEditCardModal);
createCardForm.addEventListener("click", (e) => {
  e.stopPropagation(); // To prevent the modal from getting closed when the form is clicked
});
editCardForm.addEventListener("click", (e) => {
  e.stopPropagation();
});
createModalCloseBtn.addEventListener("click", closeCreateCardModal);
editModalCloseBtn.addEventListener("click", closeEditCardModal);
createForm.addEventListener("submit", submitData);
createCardTextareas.forEach(createCardTextarea => {
  createCardTextarea.addEventListener("focus", focusTextarea);
});
editCardTextareas.forEach(editCardTextarea => {
  editCardTextarea.addEventListener("focus", focusTextarea);
});

// Function to remove welcome alert when its close button is clicked
function removeWelcomeAlert() {
  welcomeAlert.style.opacity = 0;
  setTimeout(() => {
    welcomeAlert.style.display = "none";
  }, 400);
}

// Function to show create card modal
function showCreateCardModal() {
  createCardModal.style.display = "flex";
  createForm.reset();
  focusTextarea();
}

// Function to show edit card modal
function showEditCardModal() {
  editCardModal.style.display = "flex";
  editForm.reset();
  focusTextarea();
}

// Function to hide create card modal
function closeCreateCardModal() {
  createCardModal.style.display = "none";
}

// Function to hide edit card modal
function closeEditCardModal() {
  editCardModal.style.display = "none";
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
function validateCreateCardForm(cardData) {
  const createFormQuestion = document.querySelector('textarea#create-card-question');
  const createFormAnswer = document.querySelector('textarea#create-card-answer');
  const createQuesErrorMsg = document.querySelector('#create-ques-error-msg');
  const createAnsErrorMsg = document.querySelector('#create-ans-error-msg');

  if (cardData.question == "" || cardData.answer == "") {
    console.log("Error, invalid input");

    if (cardData.question == "") {
      createFormQuestion.style.border = 'solid 3px red';
      createQuesErrorMsg.style.visibility = 'visible';
    }
    if (cardData.answer == "") {
      createFormAnswer.style.border = 'solid 3px red';
      createAnsErrorMsg.style.visibility = 'visible';
    }

    return false;
  }
  return true;
}

// Function to reset all form styling when the inputs are being focused on
function focusTextarea() {
  createCardTextareas.forEach(textarea => {
    textarea.style.border = 'solid 3px #808080';
  });

  createFormErrorMsgs.forEach(formErrorMsg => {
    formErrorMsg.style.visibility = 'hidden';
  });

  editCardTextareas.forEach(textarea => {
    textarea.style.border = 'solid 3px #808080';
  });

  editFormErrorMsgs.forEach(formErrorMsg => {
    formErrorMsg.style.visibility = 'hidden';
  });
}

// add card data to flashcard array then close the modal
function saveCard(cardData) {
  if (validateCreateCardForm(cardData)) {
    flashcardArray.push(cardData);
    updateLocalStore(flashcardArray);
    console.log(flashcardArray);
    closeCreateCardModal();
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
  editCard();
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

// Function to edit card
function editCard() {
  const editBtns = document.querySelectorAll('.fa-edit');

  [...editBtns].forEach(editBtn => {
    editBtn.addEventListener('click', () => {
      const card = editBtn.parentElement.parentElement;
      const cardIndex = [...flashcardContainer.children].indexOf(card);

      showEditCardModal();
      const editFormQues = document.querySelector('textarea#edit-card-question');
      const editFormAns = document.querySelector('textarea#edit-card-answer');
      const editFormBtn = document.querySelector('#edit-form-button');

      editFormQues.value = flashcardArray[cardIndex].question;
      editFormAns.value = flashcardArray[cardIndex].answer;

      editFormBtn.addEventListener('click', event => {
        event.preventDefault();
        flashcardArray[cardIndex].question = editFormQues.value;
        flashcardArray[cardIndex].answer = editFormAns.value;

        console.log(flashcardArray);

        [...[...card.children][0].children][1].textContent = editFormQues.value;
        [...[...card.children][1].children][1].textContent = editFormAns.value;
        // updateLocalStore(flashcardArray);
        closeEditCardModal();
        // console.log(flashcardArray);
      });
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
  // console.log(toggleBtns);
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
