// 1. Menu de Navegação Responsivo
const botaoMenu = document.querySelector('#menu');
const listaNavegacao = document.querySelector('.navigation');

botaoMenu.addEventListener('click', () => {
    listaNavegacao.classList.toggle('open');
    botaoMenu.classList.toggle('open');
});

// 2. Rodapé Dinâmico (Ano Atual e Última Modificação)
const spanAno = document.querySelector('#currentyear');
const paragrafoModificacao = document.querySelector('#lastModified');

spanAno.textContent = new Date().getFullYear();
paragrafoModificacao.textContent = `Última modificação: ${document.lastModified}`;

// 3. Carregamento Assíncrono dos Membros via Fetch
const containerMembros = document.querySelector('#container-membros');
const urlDados = 'dados/membros.json';

async function carregarMembros() {
    try {
        const resposta = await fetch(urlDados);
        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }
        const dados = await resposta.json();
        exibirMembros(dados.membros);
    } catch (erro) {
        console.error('Falha ao carregar os dados dos membros:', erro);
    }
}

function obterTextoNivel(nivel) {
    if (nivel === 3) return 'Membro Ouro';
    if (nivel === 2) return 'Membro Prata';
    return 'Membro Associado';
}

function exibirMembros(listaMembros) {
    listaMembros.forEach((empresa) => {
        const cartao = document.createElement('article');
        cartao.classList.add('cartao-membro');

        const imagem = document.createElement('img');
        imagem.src = `imagens/${empresa.imagem}`;
        imagem.alt = `Logótipo de ${empresa.nome}`;
        imagem.loading = 'lazy';
        imagem.width = 120;
        imagem.height = 120;

        const titulo = document.createElement('h3');
        titulo.textContent = empresa.nome;

        const setor = document.createElement('p');
        setor.classList.add('setor-membro');
        setor.textContent = empresa.setor;

        const endereco = document.createElement('p');
        endereco.textContent = empresa.endereco;

        const telefone = document.createElement('p');
        telefone.textContent = empresa.telefone;

        const linkSite = document.createElement('a');
        linkSite.href = empresa.site;
        linkSite.textContent = empresa.site.replace('https://', '');
        linkSite.target = '_blank';
        linkSite.rel = 'noopener';

        const selo = document.createElement('span');
        selo.classList.add('selo-nivel', `nivel-${empresa.nivel}`);
        selo.textContent = obterTextoNivel(empresa.nivel);

        cartao.appendChild(imagem);
        cartao.appendChild(titulo);
        cartao.appendChild(setor);
        cartao.appendChild(endereco);
        cartao.appendChild(telefone);
        cartao.appendChild(linkSite);
        cartao.appendChild(selo);

        containerMembros.appendChild(cartao);
    });
}

carregarMembros();

// 4. Alternar entre Visualização em Grade e Lista
const btnGrade = document.querySelector('#btn-grade');
const btnLista = document.querySelector('#btn-lista');

btnGrade.addEventListener('click', () => {
    containerMembros.classList.add('grade');
    containerMembros.classList.remove('lista');
    btnGrade.classList.add('ativo');
    btnLista.classList.remove('ativo');
});

btnLista.addEventListener('click', () => {
    containerMembros.classList.add('lista');
    containerMembros.classList.remove('grade');
    btnLista.classList.add('ativo');
    btnGrade.classList.remove('ativo');
});