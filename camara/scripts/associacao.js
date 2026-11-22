// 1. Menu Responsivo
const botaoMenu = document.querySelector('#menu');
const listaNavegacao = document.querySelector('.navigation');

botaoMenu.addEventListener('click', () => {
    listaNavegacao.classList.toggle('open');
    botaoMenu.classList.toggle('open');
});

// 2. Rodapé Dinâmico
document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Última modificação: ${document.lastModified}`;

// 3. Preencher Data e Hora Atual no Campo Oculto
const campoTimestamp = document.querySelector('#timestamp');
if (campoTimestamp) {
    campoTimestamp.value = new Date().toLocaleString('pt-BR');
}

// 4. Controlar os 4 Modais (<dialog>)
const botoesAbrirModal = document.querySelectorAll('.btn-modal');
const botoesFecharModal = document.querySelectorAll('.fechar-modal');

botoesAbrirModal.forEach((botao) => {
    botao.addEventListener('click', () => {
        const idModal = botao.getAttribute('data-modal');
        const dialog = document.getElementById(idModal);
        if (dialog) {
            dialog.showModal();
        }
    });
});

botoesFecharModal.forEach((botao) => {
    botao.addEventListener('click', () => {
        const dialog = botao.closest('dialog');
        if (dialog) {
            dialog.close();
        }
    });
});