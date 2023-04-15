const { ipcRenderer } = require("electron");

const idCite = document.getElementById("idCite");
const dateCite = document.getElementById("dateCite");
const timeCite = document.getElementById("timeCite");
const idUser = document.getElementById("idUser");
const idProcedure = document.getElementById("idProcedure");
const idEmployee = document.getElementById("idEmployee");
const validateIdCite = document.getElementById("validateIdCite");
const validateDateCite = document.getElementById("validateDateCite");
const validateTimeCite = document.getElementById("validateTimeCite");
const validateIdUser = document.getElementById("validateIdUser");
const validateIdProcedure = document.getElementById("validateIdProcedure");
const validateIdEmployee = document.getElementById("validateIdEmployee");
const validForm = document.getElementById("validForm");
const btnCancel = document.getElementById('btnCancel');

btnCancel.addEventListener('click', () => {
  window.location.href="home.html"
})

