// Variáveis utilizadas para as perguntas
let perguntas;
let trilha=1;
let trilha1;
let trilha2;
let trilha3;

function loadDefaultQuestions() {
    fetch('data/quiz.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao carregar o arquivo JSON');
        }
        return response.json();
    })
    .then(data => {
        trilha1 = data.trilha1;
        trilha2 = data.trilha2;
        trilha3 = data.trilha3;
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

function readQuestions() {
    if (trilha==1) {
        perguntas=trilha1;
    } else if (trilha==2) {
        perguntas=trilha2;
    } else {
        perguntas=trilha3;
    }

    // Verifica se o dispositivo/navegador possui a funcionalidade LocalStorage
    if(!window.localStorage) {
        return;
    }
  
    var localQuestions = window.localStorage.getItem('saved-questions' + trilha);
    if (localQuestions) {
        perguntas = JSON.parse(localQuestions);
    }
}

function saveQuestions() {
    // Verifica se o dispositivo/navegador possui a funcionalidade LocalStorage
    if(!window.localStorage) {
        return;
    }

    // Se houver questões já salvas, apaga o que está salvo para sobrescrever
    var localQuestions = window.localStorage.getItem('saved-questions' + trilha);
    if (localQuestions) {
        window.localStorage.removeItem('saved-questions' + trilha);
    }
    
    window.localStorage.setItem('saved-questions' + trilha, JSON.stringify(perguntas));
}

// Variáveis utilizadas para os usuários
let currentUser;
let usersList;

function loadDefaultUsers() {
    fetch('data/users.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao carregar o arquivo JSON');
        }
        return response.json();
    })
    .then(data => {
        usersList = data.users;
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

function readUsers() {
    // Verifica se o dispositivo/navegador possui a funcionalidade LocalStorage
    if(!window.localStorage) {
        return;
    }
  
    var localList = window.localStorage.getItem('users');
    if (localList) {
        usersList = JSON.parse(localList);
    }

    var localUser = window.localStorage.getItem('currentUser');
    if (localUser) {
        currentUser = JSON.parse(localUser);
    }
}

function saveUsers() {
    // Verifica se o dispositivo/navegador possui a funcionalidade LocalStorage
    if(!window.localStorage) {
        return;
    }

    // Se houver lista já salva, apaga o que está salvo para sobrescrever
    var localList = window.localStorage.getItem('users');
    if (localList) {
        window.localStorage.removeItem('users');
    }
    window.localStorage.setItem('users', JSON.stringify(usersList));

    // Se houver usuário já salvo, apaga o que está salvo para sobrescrever
    var localUser = window.localStorage.getItem('currentUser');
    if (localUser) {
        window.localStorage.removeItem('currentUser');
    }
    window.localStorage.setItem('currentUser', JSON.stringify(currentUser));
}