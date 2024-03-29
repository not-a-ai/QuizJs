function checkLogin(userName, passwordText) {
    for (let index = 0; index < usersList.length; index++) {
        const singleUser = usersList[index];
        if (singleUser.login == userName && singleUser.password == passwordText) {
            currentUser = singleUser;
            return true;
        }
    }
    return false;
}

function onLogin() {
    let userName = document.getElementById("unique_id").value;
    let passwordText = document.getElementById("session_pw").value;

    // Apaga os valores digitados nos campos
    document.getElementById("unique_id").value = "";
    document.getElementById("session_pw").value = "";
    readUsers();
    if (checkLogin(userName, passwordText)) {
<<<<<<< HEAD
        // Abre a página inicial do quiz
        window.open("dashboard.html", '_self');
=======
        saveUsers();
        if (currentUser.type == "student") {
            // Abre a página inicial do quiz
            window.location.replace("trilhas.html");
        } else {
            // Abre o Painel de Controle
            window.location.replace("Admin.html");
        }
>>>>>>> 9e5d6a4a505585592463de2f5a6f096384887d0e
    } else {
        // Exibe mensagem de erro
        document.getElementById("Warning-Frame").classList.remove("hidden");
        setTimeout(function() {
            document.getElementById("Warning-Frame").classList.add("hidden");
        }, 5000);
    }
}