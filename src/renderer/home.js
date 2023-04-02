const { ipcRenderer } = require("electron");

const bntViewCites = document.getElementById('viewCitesBtn');
const btnCreateCites = document.getElementById('createCitesBtn');
const btnRegistUser = document.getElementById('registUserBtn');

bntViewCites.addEventListener('click', () => {
  window.location.href="viewCites.html"
})

btnCreateCites.addEventListener('click', () => {
  window.location.href="createCites.html"
})

btnRegistUser.addEventListener('click', () => {
  window.location.href="users.html"
})

