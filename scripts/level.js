let l2 = document.getElementById("two");
if (window.localStorage.getItem('xp') < 60) {
  l2.setAttribute("block")
}

let l3 = document.getElementById("three");
if (window.localStorage.getItem('xp') < 120) {
  l3.setAttribute("class", "block level")
}
