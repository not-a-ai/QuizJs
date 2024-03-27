let currentQuestion = 0;

function onMenu(menuItem) {
    let item;
    hideAll();
    if (menuItem=='User') {
        readUsers();
        item = document.getElementById("userMenu");
        item.setAttribute("class", "menu-user");
        fillUsers();
    } else if (menuItem=='Quest') {
        item = document.getElementById("questMenu");
        item.setAttribute("class", "menu-quest");
    } else if (menuItem=='Exit') {
        window.location.replace("index.html");
    }
}

function hideAll() {
    // Menu usuário
    let item = document.getElementById("userMenu");
    item.removeAttribute("class");
    item.setAttribute("class", "hidden");
    
    // Menu questões
    item = document.getElementById("questMenu");
    item.removeAttribute("class");
    item.setAttribute("class", "hidden");
}

/*
    Gerenciamento de questões
*/
function fillQuestions(selTrilha) {
    trilha = selTrilha - 1;
    readQuestions();
    refreshQuestions();
}

function refreshQuestions() {
    let quadroQuiz = document.getElementById("questBody");
    quadroQuiz.innerHTML = "";
    
    let ul = document.createElement("ul");
    ul.setAttribute("id", "questionList");
    for (let i = 0; i < perguntas.length; i++) {
        const pergunta = perguntas[i];
    
        let li = document.createElement("li");
        li.setAttribute("id","question" + (i+1));
    
        let div = document.createElement("div");
        div.setAttribute("class", "question_item");
        
        // Botão Excluir
        let btnDel = document.createElement("button");
        btnDel.addEventListener("click", () => onClickDelete(i));
        btnDel.setAttribute("class", "fa fa-trash");
        div.appendChild(btnDel);
    
        // Botão Editar
        let btnEd = document.createElement("button");
        btnEd.addEventListener("click", () => onClickEdit(i));
        btnEd.setAttribute("class", "fa fa-pen");
        div.appendChild(btnEd);
        
        // Botão Mover para cima
        let btnUp = document.createElement("button");
        btnUp.addEventListener("click", () => onClickMoveUp(i));
        let imgU = document.createElement("img");
        imgU.setAttribute("src", "/images/up.png");
        btnUp.appendChild(imgU);
        div.appendChild(btnUp);
        
        // Botão Mover para baixo
        let btnDwn = document.createElement("button");
        btnDwn.addEventListener("click", () => onClickMoveDown(i));
        let imgD = document.createElement("img");
        imgD.setAttribute("src", "/images/down.png");
        btnDwn.appendChild(imgD);
        div.appendChild(btnDwn);
        
        // Texto da pergunta
        let divQuest = document.createElement("div");
        divQuest.setAttribute("class", "question_item_text");
        divQuest.textContent = pergunta.questao;
    
        div.appendChild(divQuest);
        li.appendChild(div);
        ul.appendChild(li);
    }
    // Exibe o rodapé
    let questFooter = document.getElementById("questFooter");
    questFooter.removeAttribute("class");
    questFooter.setAttribute("class", "quest-footer");
    let editFooter = document.getElementById("editFooter");
    editFooter.removeAttribute("class");
    editFooter.setAttribute("class", "hidden");
    
    ul.setAttribute("class", "result-questions");
    quadroQuiz.appendChild(ul);
}

function onClickMoveUp(question) {
    let questionList = document.getElementById("questionList");
    
    if (questionList.firstChild.id == "question" + (question + 1)) {
        return;
    }
    
    // Encontra a questão que irá trocar de posição com a atual
    let questionItens = questionList.children;
    let nextItem;
    for (var i = 0; i < questionItens.length; i++) {
        if (questionItens[i].id == "question" + (question + 1)) {
            nextItem = questionItens[i - 1];
            break;
        }
    }
    
    let thisItem = document.getElementById("question" + (question + 1));

    thisItem.setAttribute("class", "moveUp");

    setTimeout(function() {
        thisItem.removeAttribute("class");
        questionList.insertBefore(thisItem, nextItem);
    }, 500);
}

function onClickMoveDown(question) {
    let questionList = document.getElementById("questionList");
    
    if (questionList.lastChild.id == "question" + (question + 1)) {
        return;
    }
    
    // Encontra a questão que irá trocar de posição com a atual
    let questionItens = questionList.children;
    let nextItem;
    for (var i = 0; i < questionItens.length; i++) {
        if (questionItens[i].id == "question" + (question + 1)) {
            nextItem = questionItens[i + 1];
            break;
        }
    }
    
    let thisItem = document.getElementById("question" + (question + 1));

    thisItem.setAttribute("class", "moveDown");

    setTimeout(function() {
        thisItem.removeAttribute("class");
        questionList.insertBefore(nextItem, thisItem);
    }, 500);
}

function onCancel() {
    fillQuestions(trilha + 1);
}

function onSaveReorder() {
    let questionList = document.getElementById("questionList");
    let questionItens = questionList.children;
    let idText;
    let newPerguntas = [];
    for (var i = 0; i < questionItens.length; i++) {
        var idQuest = questionItens[i].id;
        idText = '';
        for (var j = 8; j < idQuest.length; j++) {
            idText = idText + idQuest[j];
        }
        var idNumber = Number(idText) - 1;
        newPerguntas[i] = perguntas[idNumber];
    }
    perguntas = newPerguntas;
    saveQuestions();
}

/*
    Funções de edição das questões
*/

// Editar a questão selecionada
//      Se questionNumber = -1, abre os campos em branco para nova questão.
function onClickEdit(questionNumber) {
    currentQuestion = questionNumber;

    let quadroMain = document.getElementById("questBody");
    quadroMain.innerHTML = "";

    // Pergunta
    let questionLabel = document.createElement("label");
    questionLabel.textContent = "Pergunta:";
    questionLabel.setAttribute("for", "pergunta");
    quadroMain.appendChild(questionLabel);
    let h2 = document.createElement("textarea");
    h2.setAttribute("id", "pergunta");
    if (questionNumber >= 0) {
        h2.value = perguntas[questionNumber].questao;
    }
    quadroMain.appendChild(h2);

    // Alternativas
    let alternativeLabel = document.createElement("label");
    alternativeLabel.textContent = "Alternativas:";
    alternativeLabel.setAttribute("for", "questoes");
    quadroMain.appendChild(alternativeLabel);
    let divQuestoes = document.createElement("div");
    divQuestoes.setAttribute("id", "questoes");
    let selectCorrect = document.createElement("select");
    let numAlternativas = 0;
    if (questionNumber < 0) {
        numAlternativas = 4;
    } else {
        numAlternativas = perguntas[questionNumber].alternativas.length;
    }
    for (let i = 0; i < numAlternativas; i++) {
      let divAlternativa = document.createElement("textarea");
      divAlternativa.setAttribute("class", "alternativas");
      divAlternativa.setAttribute("id", "alt" + i);
      if (questionNumber >= 0) {
          divAlternativa.value = perguntas[questionNumber].alternativas[i];
      }
      divAlternativa.setAttribute("rows", "auto");
      divAlternativa.addEventListener("input", function() {
            var op = document.getElementById("op" + i);
            op.textContent = this.value;
      })
      divQuestoes.appendChild(divAlternativa);

      let optionElement = document.createElement("option");
      optionElement.setAttribute("id", "op" + i);
      if (questionNumber < 0) {
        let initialChoices = ["A:", "B:", "C:", "D:"];
        optionElement.textContent = initialChoices[i];
      } else {
        optionElement.textContent = perguntas[questionNumber].alternativas[i];
      }
      optionElement.value = i;
      selectCorrect.appendChild(optionElement);
    }
    quadroMain.appendChild(divQuestoes);

    let corretLabel = document.createElement("label");
    corretLabel.textContent = "Qual a resposta correta?";
    quadroMain.appendChild(corretLabel);
    selectCorrect.setAttribute("id", "correctAnswer");
    corretLabel.setAttribute("for", "correctAnswer");
    if (questionNumber >= 0) {
        selectCorrect.value = perguntas[questionNumber].alternativaCorreta;
    }
    quadroMain.appendChild(selectCorrect);

    // Exibe o rodapé
    let editFooter = document.getElementById("editFooter");
    editFooter.removeAttribute("class");
    editFooter.setAttribute("class", "quest-footer");
    let questFooter = document.getElementById("questFooter");
    questFooter.removeAttribute("class");
    questFooter.setAttribute("class", "hidden");
}

function onClickDelete(questionNumber) {
    let newPerguntas = [];
    let j = 0;
    for (let i = 0; i < perguntas.length; i++) {
        if (i != questionNumber) {
            newPerguntas[j] = perguntas[i];
            j++;
        }
    }
    perguntas = newPerguntas;
    refreshQuestions();
}

// Cancela a edição da questão atual.
function onCancelQuestion() {
    onClickEdit(currentQuestion);
}

// Salva a questão editada.
function onSaveQuestion() {
    let newQuestion = {
        "questao": document.getElementById("pergunta").value,
        "alternativas": [
            document.getElementById("alt0").value,
            document.getElementById("alt1").value,
            document.getElementById("alt2").value,
            document.getElementById("alt3").value],
        "alternativaCorreta": document.getElementById("correctAnswer").value,
        "alternativaSelecionada": null
    };
    if (currentQuestion == -1) {
        // Questão nova
        perguntas[perguntas.length] = newQuestion;
    } else {
        // Questão existente
        perguntas[currentQuestion] = newQuestion;
    }
    saveQuestions();
    refreshQuestions();
}

/*
    Funções de edição de usuários
*/

function fillUsers() {
    let quadroMain = document.getElementById("userBody");
    quadroMain.innerHTML = "";
    
    let h1 = document.createElement("h1");
    h1.textContent = "Olá, " + currentUser.name + "!";
    quadroMain.appendChild(h1);

    let ul = document.createElement("ul");
    ul.setAttribute("id", "userList");
    for (let i = 0; i < usersList.length; i++) {
        const singleUser = usersList[i];
    
        let li = document.createElement("li");
        li.setAttribute("id","user" + (i+1));
    
        let div = document.createElement("div");
        div.setAttribute("class", "user_item");
        
        // Botão Excluir
        let btnDel = document.createElement("button");
        btnDel.addEventListener("click", () => onDeleteUser(i));
        btnDel.setAttribute("class", "fa fa-trash");
        div.appendChild(btnDel);
    
        // Botão Editar
        let btnEd = document.createElement("button");
        btnEd.addEventListener("click", () => onEditUser(i));
        btnEd.setAttribute("class", "fa fa-pen");
        div.appendChild(btnEd);
        
        // Nome do usuário
        let divUser = document.createElement("div");
        divUser.setAttribute("class", "user_item_name");
        divUser.textContent = singleUser.name;
    
        div.appendChild(divUser);
        li.appendChild(div);
        ul.appendChild(li);
    }
    quadroMain.appendChild(ul);
}

function onDeleteUser(idUser) {
    // Não é possível excluir o próprio usuário
    if (currentUser.login == usersList[idUser].login) {
        return;
    }
    
    let newUsers = [];
    let j = 0;
    for (let i = 0; i < usersList.length; i++) {
        if (i != idUser) {
            newUsers[j] = usersList[i];
            j++;
        }
    }
    usersList = newUsers;
    fillUsers();
}

function onCancelUser() {
    readUsers();
    fillUsers();
}

function onNewUser() {
    // Verifica o último número de id
    let ul = document.getElementById("userList");
    let lastIdText = "";
    for (let i = 4; i < ul.lastChild.id.length; i++) {
        lastIdText += ul.lastChild.id[i];
    }
    let lastId = Number(lastIdText) + 1;
    
    let li = document.createElement("li");
    li.setAttribute("id","user" + lastId);

    let div = document.createElement("div");
    div.setAttribute("class", "user_item");
    
    // Botão Excluir
    let btnDel = document.createElement("button");
    btnDel.addEventListener("click", () => onDeleteUser(lastId));
    btnDel.setAttribute("class", "fa fa-trash");
    div.appendChild(btnDel);

    // Botão Editar
    let btnEd = document.createElement("button");
    btnEd.addEventListener("click", () => onEditUser(lastId));
    btnEd.setAttribute("class", "fa fa-pen");
    div.appendChild(btnEd);
    
    // Nome do usuário
    let divUser = document.createElement("input");
    divUser.setAttribute("class", "user_item_name");

    div.appendChild(divUser);
    li.appendChild(div);
    ul.appendChild(li);
}