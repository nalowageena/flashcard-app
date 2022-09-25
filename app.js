const welcomeAlert = document.querySelector('.welcome');

const closeWelcome = document.querySelector('.fa-close');

closeWelcome.addEventListener('click', ()=>{
    welcomeAlert.style.opacity = 0;
    setTimeout(() => {  welcomeAlert.style.display = 'none'; }, 400);
});