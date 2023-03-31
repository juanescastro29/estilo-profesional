const { ipcRenderer } = require("electron");

const bntViewCites = document.getElementById('viewCitesBtn');
const btnCreateCites = document.getElementById('createCitesBtn');
const btnRegistUser = document.getElementById('registUserBtn');

bntViewCites.addEventListener('click', () => {
  window.location.href="viewCites.html"
  console.log("click view cites");
})

btnCreateCites.addEventListener('click', () => {
  window.location.href="createCites.html"
  console.log("click create cites");
})

btnRegistUser.addEventListener('click', () => {
  window.location.href="user.html"
})

