const cursos = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will cover the fundamentals of programming, writing algorithms, data types, and basic control structures.',
        technology: [ 'Python' ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to web page development for the web using HTML, CSS, and basic JavaScript.',
        technology: [ 'HTML', 'CSS', 'JavaScript' ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students are taught more in-depth programming concepts using the Python programming language. Topics include functions, dictionaries, recursion, and unit testing.',
        technology: [ 'Python' ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the concepts of object-oriented programming. Students will learn how to define classes, create objects, and use inheritance.',
        technology: [ 'C#' ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior Web Fundamentals knowledge by incorporating more advanced JavaScript, asynchronous programming, and DOM manipulation.',
        technology: [ 'HTML', 'CSS', 'JavaScript' ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Web Frontend Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Focuses on user experience, responsive design, advanced CSS selectors, grid layouts, and working with JSON data via fetch APIs.',
        technology: [ 'HTML', 'CSS', 'JavaScript' ],
        completed: false
    }
];

const containerCursos = document.querySelector('#container-cursos');
const elementoCreditos = document.querySelector('#total-creditos');
const btnTodos = document.querySelector('#todos');
const btnWdd = document.querySelector('#wdd');
const btnCse = document.querySelector('#cse');

function exibirCursos(listaCursos) {
    if (!containerCursos) return;
    containerCursos.innerHTML = '';
    
    listaCursos.forEach(curso => {
        const cartao = document.createElement('div');
        cartao.classList.add('curso-card');
        if (curso.completed) {
            cartao.classList.add('concluido');
        } else {
            cartao.classList.add('pendente');
        }

        cartao.innerHTML = `
            <h3>${curso.subject} ${curso.number}</h3>
            <p>${curso.title}</p>
            <small>Créditos: ${curso.credits}</small>
        `;
        containerCursos.appendChild(cartao);
    });

    // Calcula os créditos totais usando reduce
    const totalCreditos = listaCursos.reduce((soma, curso) => soma + curso.credits, 0);
    if (elementoCreditos) {
        elementoCreditos.textContent = `Número total de créditos necessários para os cursos exibidos: ${totalCreditos}`;
    }
}

// Event Listeners para os botões de filtro
if (btnTodos) {
    btnTodos.addEventListener('click', () => exibirCursos(cursos));
}
if (btnWdd) {
    btnWdd.addEventListener('click', () => {
        const filtrados = cursos.filter(curso => curso.subject === 'WDD');
        exibirCursos(filtrados);
    });
}
if (btnCse) {
    btnCse.addEventListener('click', () => {
        const filtrados = cursos.filter(curso => curso.subject === 'CSE');
        exibirCursos(filtrados);
    });
}

// Inicializa exibindo todos os cursos ao carregar a página
exibirCursos(cursos);