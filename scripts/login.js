let usersList;

function loadUsers() {
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

function checkLogin(userName, passwordText) {
    for (let index = 0; index < usersList.length; index++) {
        const singleUser = usersList[index];
        if (singleUser.login == userName && singleUser.password == passwordText) {
            return true;
        }
    }
    return false;
}

function onClickLogin() {
    let userName = document.getElementById("unique_id").value;
    let passwordText = document.getElementById("session_pw").value;

    // Apaga os valores digitados nos campos
    document.getElementById("unique_id").value = "";
    document.getElementById("session_pw").value = "";
    if (checkLogin(userName, passwordText)) {
        // Abre a página inicial do quiz
        window.open("trilhas.html", '_self');
    } else {
        // Exibe mensagem de erro
        document.getElementById("Warning-Frame").classList.remove("hidden");
        setTimeout(function() {
            document.getElementById("Warning-Frame").classList.add("hidden");
        }, 5000);
    }
}

loadUsers();