const { ipcRenderer } = require("electron");

const idCite = document.getElementById("idCite");
const dateCite = document.getElementById("dateCite");
const timeCite = document.getElementById("timeCite");
const idUser = document.getElementById("idUser");
const idProcedure = document.getElementById("idProcedure");
const idEmployee = document.getElementById("idEmployee");
const createCiteHairdresser = document.getElementById("createCiteHairdresser");
const validateIdCite = document.getElementById("validateIdCite");
const validateDateCite = document.getElementById("validateDateCite");
const validateTimeCite = document.getElementById("validateTimeCite");
const validateIdUser = document.getElementById("validateIdUser");
const validateIdProcedure = document.getElementById("validateIdProcedure");
const validateIdEmployee = document.getElementById("validateIdEmployee");
const validForm = document.getElementById("validForm");
const btnCancel = document.getElementById('btnCancel');

let usersSearch = [];

createCiteHairdresser.addEventListener("submit", (e) => {
  const regexIdCite= new RegExp("^([0-9]{4})$");
  const regexIdUser = new RegExp("^([0-9]{6,10})$");

  if (
    idCite != "" &&
    dateCite != "" &&
    timeCite != "" &&
    idUser != "" &&
    idProcedure != "" &&
    idEmployee != ""
  ) {
    if (
      regexIdCite.test(idCite.value) &&
      regexIdUser.test(idUser.value)
    ) {
      const cite = {
        idCita: idCite.value,
        fechaCita: dateCite.value,
        hora: timeCite.value,
        idUsuario: idUser.value,
        idProcedimiento: idProcedure.value,
        idEmpleado: idEmployee.value,
        estado: "ACTIVA"
      };
      ipcRenderer.send("add-cite", cite)
    } else {
      e.preventDefault();
      validateIdCite.innerHTML = "";
      validateDateCite.innerHTML = "";
      validateTimeCite.innerHTML = "";
      validateIdUser.innerHTML = "";
      validateIdProcedure.innerHTML = "";
      validateIdEmployee.innerHTML = "";

      if (!regexIdCite.test(idCite.value)){
        validateIdCite.innerHTML += '<small>El tamaño de la cedúla no es correcto y solo se permiten números.</small>';
      }
      if (!regexIdUser.test(idUser.value)){
        validateIdUser.innerHTML += '<small>El tamaño de la cedula no es correcto y solo se permiten números.</small>';
      }
    }
  } else {
    e.preventDefault();
    validForm.innerHTML = "";
    validateIdCite.innerHTML = "";
    validateDateCite.innerHTML = "";
    validateTimeCite.innerHTML = "";
    validateIdUser.innerHTML = "";
    validateIdProcedure.innerHTML = "";
    validateIdEmployee.innerHTML = "";

    validForm.innerHTML += `
        Todos los campos son requeridos.
    `;

    if (idCite.value == ""){
      validateDateCite.innerHTML += `<small>Este campo es requerido.</small>`;
    }
    if (dateCite.value == ""){
      validateDateCite.innerHTML += `<small>Este campo es requerido.</small>`;
    }
    if (timeCite.value == ""){
      validateTimeCite.innerHTML += `<small>Este campo es requerido.</small>`;
    }
    if (idUser.value == ""){
      validateIdUser.innerHTML += `<small>Este campo es requerido.</small>`;
    }
    if (idProcedure.value == ""){
      validateIdProcedure.innerHTML += `<small>Este campo es requerido.</small>`;
    }
    if(idEmployee.value == ""){
      validateIdEmployee.innerHTML += `<small>Este campo es requerido.</small>`;
    }
  }
});

idCite.addEventListener("focusout", (e) => {
  validateIdCite.innerHTML = "";
  if (e.target.value = ""){
    validateIdCite.innerHTML += `<small>Este campo es requerido.</small>`;
  }
});

idCite.addEventListener("input", (e) =>{
  const regex = new RegExp("^([a-zA-Z]{0}[0-9]{4}[a-zA-Z]{0})$");
  validateIdCite.innerHTML = "";
  if ( !regex.test(e.target.value ) ){
    validateIdCite.innerHTML += `
    <small>El tamaño del identificador no es correcto y solo se permiten números.</small>`;
  }

});

timeCite.addEventListener("focusout", (e) => {
  validateTimeCite.innerHTML = "";
  if (e.target.value = ""){
    validateTimeCite.innerHTML += `<small>Este campo es requerido.</small>`;
  }
});

dateCite.addEventListener("focusout", (e) => {
  validateDateCite.innerHTML = "";
  if (e.target.value = ""){
    validateDateCite.innerHTML += `<small>Este campo es requerido.</small>`;
  }
});

idUser.addEventListener("focusout", (e) => {
  validateIdUser.innerHTML = "";
  if (e.target.value = ""){
    validateIdUser.innerHTML += `<small>Este campo es requerido.</small>`;
  }
});

idProcedure.addEventListener("focusout", (e) => {
  validateIdProcedure.innerHTML = "";
  if (e.target.value = ""){
    validateIdProcedure.innerHTML += `<small>Este campo es requerido.</small>`;
  }
});

idEmployee.addEventListener("focusout", (e) => {
  validateIdEmployee.innerHTML = "";
  if (e.target.value = ""){
    validateIdEmployee.innerHTML += `<small>Este campo es requerido.</small>`;
  }
});

btnCancel.addEventListener("click", () => {
  window.location.href="home.html"
});

function renderSearch(users) {
  validateIdUser.innerHTML = "";
  users.length !== 0
    ? usersSearch.forEach((user) => {
      validateIdUser.innerHTML += `<small>El usuario esta registrado: ${user.nombreUsuario} ` ` 
      ${user.apellidoUsuario}.</small>`;
    })
    : (validateIdUser.innerHTML += `<small>El usuario con cedula ${idUser.value}.</small>`);
};

ipcRenderer.on("search-user-cite", (event, args) => {
  usersSearch = JSON.parse(args);
  renderSearch(usersSearch);
});