const welcomeAlert = document.querySelector('.welcome');

const closeWelcome = document.querySelector('.fa-close');

const deletebtns = document.querySelectorAll('.fa-trash');

const flashcards = document.querySelectorAll('.flashcard')

closeWelcome.addEventListener('click', ()=>{
    welcomeAlert.style.opacity = 0;
    setTimeout(() => {  welcomeAlert.style.display = 'none'; }, 400);
});

Array.from(deletebtns).forEach(btn =>{
    btn.addEventListener('click', ()=>{
        let card = btn.parentElement.parentElement;
        setTimeout(() => {  card.style.display = 'none'; }, 400);
    })
});