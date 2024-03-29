let hello = document.getElementById('hellouser');
console.log(hello.innerHTML);

  let xpCT = document.getElementById('xp');
  xpCT.innerHTML = "XP: 0";
  if(window.localStorage.getItem('xp')) {
    let valor = window.localStorage.getItem('xp');
    console.log(valor);
    xpCT.innerHTML = "XP: " + valor
  }

