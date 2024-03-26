function onMenu(menuItem) {
    if (menuItem=='Exit') {
        window.location.replace("index.html");
        //window.open("index.html", '_self');
    } else if (menuItem=='User') {
        // Limpa a div do painel
        let panel = document.getElementById("panel");
        //panel.innerHTML = "";

        // Conteúdo da página
        let h2 = document.createElement("h1");
        h2.textContent = "Teste";
        panel.appendChild(h2);
    }
}

function fillQuestions(selTrilha) {
    trilha = selTrilha-1;
    readQuestions();

    // Limpa a div do quadro-quiz
    let quadroQuiz = document.getElementById("questBody");
    quadroQuiz.innerHTML = "";

    // Titulos
    quadroQuiz.setAttribute('class', 'animate__animated animate__backInUp result-quiz')

    let ul = document.createElement("ul");
    ul.setAttribute("id", "questionList");
    for (let i = 0; i < perguntas.length; i++) {
        const pergunta = perguntas[i];

        let li = document.createElement("li");
        li.setAttribute("id","question" + (i+1));
/*        let input = document.createElement("input");
        input.setAttribute("type","text");
        input.setAttribute("id", "question" + i);
        input.setAttribute("value", pergunta.questao); */

        let div = document.createElement("div");
        div.setAttribute("class", "question_item");
        
        let btnEd = document.createElement("button");
        btnEd.addEventListener("click", () => onClickEdit(i));
        btnEd.setAttribute("class", "fa fa-pen");
        div.appendChild(btnEd);
        
        let btnUp = document.createElement("button");
        btnUp.addEventListener("click", () => onClickMoveUp(i));
        
        let imgU = document.createElement("img");
        imgU.setAttribute("src", "/images/up.png");
        btnUp.appendChild(imgU);

        //btnUp.setAttribute("class", "fa fa-cog");
        div.appendChild(btnUp);
        
        let btnDwn = document.createElement("button");
        btnDwn.addEventListener("click", () => onClickMoveDown(i));
        //btnDwn.setAttribute("class", "fa-solid fa-triangle");
        
        let imgD = document.createElement("img");
        imgD.setAttribute("src", "/images/down.png");
        btnDwn.appendChild(imgD);
        div.appendChild(btnDwn);
        
        let divQuest = document.createElement("div");
        divQuest.setAttribute("class", "question_item_text");
        divQuest.textContent = pergunta.questao;

        div.appendChild(divQuest);
        li.appendChild(div);
        ul.appendChild(li);
    }
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