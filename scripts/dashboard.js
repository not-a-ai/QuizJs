  let hello = document.getElementById('hellouser');
  let user = JSON.parse(window.localStorage.getItem('currentUser'));
  hello.innerHTML = 'Olá ' + user.name + '!'

  let valor = window.localStorage.getItem('xp');
  let xpCT = document.getElementById('xp');
  xpCT.innerHTML = "XP: 0";
  if(window.localStorage.getItem('xp')) {
    xpCT.innerHTML = "XP: " + valor
  }



//progresso
let percent = document.getElementById('percent');
let bar = document.getElementById('myBar');
percent.innerHTML = valor * 18 /100 + '%'
bar.setAttribute('style', 'width: ' + valor * 18 /100  + '% !important')

//medalhas

let med1 = document.getElementById('m1');
let med2 = document.getElementById('m2');
let med3 = document.getElementById('m3');
let med4 = document.getElementById('m4');
let med5 = document.getElementById('m5');
let med6 = document.getElementById('m6');

if(valor < 100) {
  med1.setAttribute('class', 'lock')
} 
if(valor < 180) {
  med2.setAttribute('class', 'lock')
}
if(valor < 260) {
  med3.setAttribute('class', 'lock')
} 
if(valor < 340) {
  med4.setAttribute('class', 'lock')
}
if(valor < 420) {
  med5.setAttribute('class', 'lock')
} 
if(valor < 500) {
  med6.setAttribute('class', 'lock')
}

//logout 
 function clearuser() {
  window.localStorage.removeItem('currentUser');
 }