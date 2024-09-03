let intro = document.querySelector('.intro');
let logo = document.querySelector('.logo-header');
let lgSpan = document.querySelectorAll('.logo');

window.addEventListener('DOMContentLoaded', ()=> {

    setTimeout(() => {

    lgSpan.forEach((span, idx)=> {

        setTimeout(() => {
        span.classList.add('active');
      }, (idx + 1) * 400)

    });

    setTimeout(() => {
        lgSpan.forEach((span, idx) => {
        setTimeout(() => {
            span.classList.remove('active');
            span.classList.add('fade');
        }, (idx + 1) * 800)
        })
    }, 4000);

    setTimeout(() => {
        intro.style.top = '-100vh';
    }, 4000)
    
    })
})

function gotoGame() {
    setInterval(() => {
        window.location.href="make-your-game.html";
    }, 1000);
    
}
