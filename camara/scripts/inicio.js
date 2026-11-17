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

// 3. API OpenWeatherMap (Recife, PE)
const apiKey = 'ec3c469180ff0a45c01d9e38d4ba23fb'; // <-- Insira sua chave gratuita do OpenWeatherMap
const lat = -8.0578;
const lon = -34.8829;

const urlClimaAtual = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${apiKey}`;
const urlPrevisao = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${apiKey}`;

async function buscarClima() {
    try {
        const [respAtual, respPrev] = await Promise.all([
            fetch(urlClimaAtual),
            fetch(urlPrevisao)
        ]);

        if (!respAtual.ok || !respPrev.ok) {
            throw new Error('Erro ao consultar a API OpenWeatherMap');
        }

        const dadosAtuais = await respAtual.json();
        const dadosPrevisao = await respPrev.json();

        exibirClimaAtual(dadosAtuais);
        exibirPrevisao3Dias(dadosPrevisao);
    } catch (erro) {
        console.error('Erro no clima:', erro);
        document.querySelector('#tempo-atual').innerHTML = '<p>Não foi possível carregar o clima atual.</p>';
        document.querySelector('#previsao-dias').innerHTML = '<p>Previsão indisponível no momento.</p>';
    }
}

function exibirClimaAtual(dados) {
    const container = document.querySelector('#tempo-atual');
    const temp = Math.round(dados.main.temp);
    const descricao = dados.weather[0].description;
    const icone = dados.weather[0].icon;
    const umidade = dados.main.humidity;

    container.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${icone}@2x.png" alt="${descricao}" width="64" height="64">
        <div>
            <p class="temp-destaque">${temp}°C</p>
            <p class="desc-clima">${descricao}</p>
            <p>Umidade: ${umidade}%</p>
        </div>
    `;
}

function exibirPrevisao3Dias(dados) {
    const container = document.querySelector('#previsao-dias');
    container.innerHTML = '';

    // Filtra as leituras próximas ao meio-dia (12:00:00) dos próximos 3 dias
    const hoje = new Date().toISOString().split('T')[0];
    const diasFiltrados = dados.list
        .filter(item => item.dt_txt.includes('12:00:00') && !item.dt_txt.startsWith(hoje))
        .slice(0, 3);

    diasFiltrados.forEach(dia => {
        const dataObj = new Date(dia.dt * 1000);
        const nomeDia = dataObj.toLocaleDateString('pt-BR', { weekday: 'long' });
        const diaCapitalizado = nomeDia.charAt(0).toUpperCase() + nomeDia.slice(1);
        const temp = Math.round(dia.main.temp);

        const linha = document.createElement('div');
        linha.classList.add('linha-previsao');
        linha.innerHTML = `
            <span>${diaCapitalizado}</span>
            <strong>${temp}°C</strong>
        `;
        container.appendChild(linha);
    });
}

buscarClima();

// 4. Empresas em Destaque (Aleatório entre Ouro [3] e Prata [2])
async function carregarDestaques() {
    try {
        const resposta = await fetch('dados/membros.json');
        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }
        const dados = await resposta.json();

        // Filtra apenas membros Ouro (3) e Prata (2)
        const elegiveis = dados.membros.filter(m => m.nivel === 3 || m.nivel === 2);

        // Embaralha aleatoriamente (Fisher-Yates) e seleciona 3 empresas
        for (let i = elegiveis.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [elegiveis[i], elegiveis[j]] = [elegiveis[j], elegiveis[i]];
        }
        const selecionados = elegiveis.slice(0, 3);

        exibirDestaques(selecionados);
    } catch (erro) {
        console.error('Erro ao carregar destaques:', erro);
    }
}

function exibirDestaques(lista) {
    const container = document.querySelector('#container-destaques');
    container.innerHTML = '';

    lista.forEach(empresa => {
        const textoNivel = empresa.nivel === 3 ? 'Membro Ouro' : 'Membro Prata';
        const cartao = document.createElement('article');
        cartao.classList.add('cartao-destaque');

        cartao.innerHTML = `
            <h3>${empresa.nome}</h3>
            <img src="imagens/${empresa.imagem}" alt="Logótipo de ${empresa.nome}" loading="lazy" width="100" height="100">
            <p>${empresa.endereco}</p>
            <p>${empresa.telefone}</p>
            <a href="${empresa.site}" target="_blank" rel="noopener">${empresa.site.replace('https://', '')}</a>
            <span class="selo-nivel nivel-${empresa.nivel}">${textoNivel}</span>
        `;
        container.appendChild(cartao);
    });
}

carregarDestaques();