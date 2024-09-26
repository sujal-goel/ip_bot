const wrapper = document.querySelector('.wrapper');
const registerLink = document.querySelector('.register-link');
const loginLink = document.querySelector('.login-link');
const logregLinks = document.querySelectorAll('.logreg-link');

registerLink.addEventListener("click", () => {
    logregLinks[0].style.display = 'none';
    setTimeout(() => {
        logregLinks[1].style.display = 'block';
    }, 700);
    wrapper.classList.add('active');
});

loginLink.addEventListener("click", () => {
    logregLinks[0].style.display = 'none';
    wrapper.classList.remove('active');
    
    setTimeout(() => {
        logregLinks[0].style.display = 'block'; 
    }, 700);
});
