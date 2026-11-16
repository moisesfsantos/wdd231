// Preenche o ano atual dinamicamente
const spanAno = document.querySelector("#anoAtual");
if (spanAno) {
    spanAno.textContent = new Date().getFullYear();
}

// Preenche a data da última modificação do documento
const paragrafoModificacao = document.querySelector("#ultimaModificacao");
if (paragrafoModificacao) {
    paragrafoModificacao.innerHTML = `Última modificação: <span class="highlight">${document.lastModified}</span>`;
}