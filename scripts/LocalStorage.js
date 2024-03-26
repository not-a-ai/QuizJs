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
        console.log("Dados excluídos");
    }
    
    window.localStorage.setItem('saved-questions' + trilha, JSON.stringify(perguntas));
    console.log("Dados salvos");
}