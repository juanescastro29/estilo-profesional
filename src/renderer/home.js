const { ipcRenderer } = require("electron");

const btnCreateCites = document.getElementById('createCitesBtn');
const bntViewCites = document.getElementById('viewCitesBtn');
const btnRegistUser = document.getElementById('registUserBtn');

btnCreateCites.addEventListener('click', () => {
  window.location.href="createCites.html"
})

bntViewCites.addEventListener('click', () => {
  window.location.href="viewCites.html"
})

btnRegistUser.addEventListener('click', () => {
  window.location.href="users.html"
})
