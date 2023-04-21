const { ipcRenderer } = require("electron");

const dateCite = document.getElementById("dateCite");
const timeCite = document.getElementById("timeCite");
const idUser = document.getElementById("idUser");
const idProcedure = document.getElementById("idProcedure");
const idEmployee = document.getElementById("idEmployee");
const createCiteHairdresser = document.getElementById("createCiteHairdresser");
const validateDateCite = document.getElementById("validateDateCite");
const validateTimeCite = document.getElementById("validateTimeCite");
const validateIdUser = document.getElementById("validateIdUser");
const validateIdProcedure = document.getElementById("validateIdProcedure");
const validateIdEmployee = document.getElementById("validateIdEmployee");
const validForm = document.getElementById("validForm");
const btnCancel = document.getElementById("btnCancel");

let usersSearch = [];
let employes = [];
let procedures = [];
var today = new Date();

createCiteHairdresser.addEventListener("submit", (e) => {
  const regexIdUser = new RegExp("^([0-9]{6,10})$");

  if (
    dateCite.value != "" &&
    timeCite.value != "" &&
    idUser.value != "" &&
    idProcedure.value != "" &&
    idEmployee.value != ""
  ) {
    if (regexIdUser.test(idUser.value)) {
      const cite = {
        idCita: 0,
        fechaCita: dateCite.value,
        hora: timeCite.value,
        idUsuario: idUser.value,
        idProcedimiento: idProcedure.value,
        idEmpleado: idEmployee.value,
        estado: "ACTIVA",
      };
      ipcRenderer.send("add-cite", cite);
    } else {
      e.preventDefault();
      validateDateCite.innerHTML = "";
      validateTimeCite.innerHTML = "";
      validateIdUser.innerHTML = "";
      validateIdProcedure.innerHTML = "";
      validateIdEmployee.innerHTML = "";

      if (!regexIdUser.test(idUser.value)) {
        validateIdUser.innerHTML += `<small>El tamaño de la cedula no es correcto y solo se permiten números.</small>`;
      }
    }
  } else {
    e.preventDefault();
    validForm.innerHTML = "";
    validateDateCite.innerHTML = "";
    validateTimeCite.innerHTML = "";
    validateIdUser.innerHTML = "";
    validateIdProcedure.innerHTML = "";
    validateIdEmployee.innerHTML = "";

    validForm.innerHTML += `Todos los campos son requeridos.`;

    if (dateCite.value == "") {
      validateDateCite.innerHTML += `<small>Este campo es requerido.</small>`;
    }
    if (timeCite.value == "") {
      validateTimeCite.innerHTML += `<small>Este campo es requerido.</small>`;
    }
    if (idUser.value == "") {
      validateIdUser.innerHTML += `<small>Este campo es requerido.</small>`;
    }
    if (idProcedure.value == "") {
      validateIdProcedure.innerHTML += `<small>Este campo es requerido.</small>`;
    }
    if (idEmployee.value == "") {
      validateIdEmployee.innerHTML += `<small>Este campo es requerido.</small>`;
    }
  }
});

idUser.addEventListener("focusout", (e) => {
  validateIdUser.innerHTML = "";
  if (e.target.value == "") {
    validateIdUser.innerHTML += `<small>Este campo es requerido.</small>`;
  }
});

idUser.addEventListener("input", (e) => {
  const regex = new RegExp("^([a-zA-Z]{0}[0-9]{6,10}[a-zA-Z]{0})$");
  validateIdUser.innerHTML = "";
  if (!regex.test(e.target.value)) {
    validateIdUser.innerHTML += `
    <small>El tamaño de la cedúla no es correcto y solo se permiten números.</small>
    `;
  }
});

dateCite.addEventListener("focusout", (e) => {
  validateDateCite.innerHTML = "";
  if (e.target.value == "") {
    validateDateCite.innerHTML += `<small>Este campo es requerido.</small>`;
  }
});

dateCite.addEventListener("change", (e) => {
  const fechaHoy = `${today.getFullYear()}-0${
    today.getMonth() + 1
  }-${today.getDate()}`;
  const fechaIngresada = `${dateCite.value}`;
  validateDateCite.innerHTML = "";
  if (fechaIngresada < fechaHoy) {
    validateDateCite.innerHTML += `La fecha debe ser posterior a la fecha actual`;
    dateCite.value = "";
  }
});

idProcedure.addEventListener("focusout", (e) => {
  validateIdProcedure.innerHTML = "";
  if (e.target.value == "") {
    validateIdProcedure.innerHTML += `<small>Este campo es requerido.</small>`;
  }
});

idEmployee.addEventListener("focusout", (e) => {
  validateIdEmployee.innerHTML = "";
  if (e.target.value == "") {
    validateIdEmployee.innerHTML += `<small>Este campo es requerido.</small>`;
  }
});

timeCite.addEventListener("focusout", (e) => {
  validateTimeCite.innerHTML = "";
  if (e.target.value == "") {
    validateTimeCite.innerHTML += `<small>Este campo es requerido.</small>`;
  }
});

btnCancel.addEventListener("click", () => {
  window.location.href = "createCites.html";
});

function renderSearch(users) {
  validateIdUser.innerHTML = "";
  users.length !== 0
    ? usersSearch.forEach((user) => {
        validateIdUser.innerHTML += `<small>El usuario esta registrado: ${user.nombreUsuario} `` 
      ${user.apellidoUsuario}.</small>`;
      })
    : (validateIdUser.innerHTML += `<small>El usuario con cedula ${idUser.value} no esta registrado.</small>`);
}

function renderEmployes(employes) {
  idEmployee.innerHTML = "";
  idEmployee.innerHTML = `
        <option value="">Seleccione el empleado</option>`;
  employes.length !== 0
    ? employes.forEach((employ) => {
        idEmployee.innerHTML = idEmployee.innerHTML + `
        <option value=${employ.idEmpleado}>${employ.nombreEmpleado} ${employ.apellidoEmpleado}</option>
      `;
      })
    : (idEmployee.innerHTML = `
    <option value="">No hay empleados en la base de datos</option>`);
}

function renderProcedures(procedures) {
  idProcedure.innerHTML = "";
  idProcedure.innerHTML = `
        <option value="">Seleccione el procedimiento</option>`;
  procedures.length !== 0
    ? procedures.forEach((procedure) => {
        idProcedure.innerHTML = idProcedure.innerHTML + `
        <option value=${procedure.idProcedimiento}>${procedure.nombreProcedimiento}</option>
      `;
      })
    : (idProcedure.innerHTML = `
    <option value="">No hay procedimientos en la base de datos</option>`);
}

function renderHours(hours) {
  timeCite.innerHTML = "";
  timeCite.innerHTML = `
        <option value="">Seleccione la hora</option>`;
  hours.length !== 0
    ? hours.forEach((hour) => {
        if (hour.hora != "null") {
          timeCite.innerHTML =
            timeCite.innerHTML +
            `
        <option value=${hour.hora}>${hour.hora}</option>
      `;
        }
      })
    : (timeCite.innerHTML = `
    <option value="">No hay horas disponibles para agendar la cita</option>`);
}

ipcRenderer.on("search-user-cite", (event, args) => {
  usersSearch = JSON.parse(args);
  renderSearch(usersSearch);
});

ipcRenderer.on("employes", (event, args) => {
  employes = JSON.parse(args);
  renderEmployes(employes);
});

ipcRenderer.on("procedures-hairdresser", (event, args) => {
  procedures = JSON.parse(args);
  renderProcedures(procedures);
});

ipcRenderer.on("render-hours", (event, args) => {
  hours = JSON.parse(args);
  console.log(hours);
  renderHours(hours);
});

ipcRenderer.send("get-employes");
ipcRenderer.send("get-procedures-hairdresser");
