const { ipcRenderer } = require("electron");

const bntCiteHairdresser = document.getElementById('citeHairdresserBtn');
const btnCiteDepilation = document.getElementById('citeDepilationBtn');
const btnCiteNails = document.getElementById('citeNailsBtn');

bntCiteHairdresser.addEventListener('click', () => {
  window.location.href="citeHairdresser.html"
})

btnCiteDepilation.addEventListener('click', () => {
  window.location.href="citeDepilation.html"
})

btnCiteNails.addEventListener('click', () => {
  window.location.href="citeNails.html"
})
