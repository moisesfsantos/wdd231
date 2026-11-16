const botaoMenu = document.querySelector('#menu');
const navegacao = document.querySelector('.navigation');

if (botaoMenu && navegacao) {
    botaoMenu.addEventListener('click', () => {
        navegacao.classList.toggle('open');
        botaoMenu.classList.toggle('open');
    });
}