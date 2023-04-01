const { ipcRenderer } = require("electron");

const btnCancel = document.getElementById('btnCancel');

btnCancel.addEventListener('click', () => {
  window.location.href="home.html"
})