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