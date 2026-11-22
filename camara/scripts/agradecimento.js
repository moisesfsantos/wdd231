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

// 3. Ler Parâmetros da URL (GET) e Exibir
const parametros = new URLSearchParams(window.location.search);
const containerDados = document.querySelector('#dados-enviados');

if (containerDados) {
    const nome = parametros.get('nome') || 'Não informado';
    const sobrenome = parametros.get('sobrenome') || 'Não informado';
    const email = parametros.get('email') || 'Não informado';
    const celular = parametros.get('celular') || 'Não informado';
    const organizacao = parametros.get('organizacao') || 'Não informado';
    const timestamp = parametros.get('timestamp') || 'Não registrado';

    containerDados.innerHTML = `
        <p><strong>Nome Completo:</strong> ${nome} ${sobrenome}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Celular:</strong> ${celular}</p>
        <p><strong>Empresa / Organização:</strong> ${organizacao}</p>
        <p><strong>Data e Hora do Envio:</strong> ${timestamp}</p>
    `;
}