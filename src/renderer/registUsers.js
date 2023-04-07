const { ipcRenderer, ipcMain } = require("electron");

const idUsuario = document.getElementById("idUser");
const nombreUsuario = document.getElementById("firstName");
const apellidoUsuario = document.getElementById("lastName");
const telefonoUsuario = document.getElementById("userPhone");
const registerUsers = document.getElementById("registerUsers");
const validateIdUser = document.getElementById("validateIdUser");
const validateFirstName = document.getElementById("validateFirstName");
const validateLastName = document.getElementById("validateLastName");
const validateUserPhone = document.getElementById("validateUserPhone");
const validForm = document.getElementById("validForm");

registerUsers.addEventListener("submit", (e) => {
  const regexIdUsuario = new RegExp("^([0-9]{6,10})$");
  const regexNombreUsuario = new RegExp("^([a-zA-Z]+)$");
  const regexApellidoUsuario = new RegExp("^([a-zA-Z]+)$");
  const regexTelefonoUsuario = new RegExp("^([0-9]{10})$");

  if (
    idUsuario.value != "" &&
    nombreUsuario.value != "" &&
    apellidoUsuario.value != "" &&
    telefonoUsuario.value != ""
  ) {
    if (
      regexIdUsuario.test(idUsuario.value) &&
      regexNombreUsuario.test(nombreUsuario.value.replace(/\s/g, "")) &&
      regexApellidoUsuario.test(apellidoUsuario.value.replace(/\s/g, "")) &&
      regexTelefonoUsuario.test(telefonoUsuario.value)
    ) {
      const user = {
        idUsuario: idUsuario.value,
        nombreUsuario: nombreUsuario.value,
        apellidoUsuario: apellidoUsuario.value,
        telefonoUsuario: telefonoUsuario.value,
      };
      ipcRenderer.send("add-user", user)
    } else {
      e.preventDefault();
      validateIdUser.innerHTML = "";
      validateFirstName.innerHTML = "";
      validateLastName.innerHTML = "";
      validateUserPhone.innerHTML = "";

      if (!regexIdUsuario.test(idUsuario.value)) {
        validateIdUser.innerHTML += `
        <small>El tamaño de la cedúla no es correcto y solo se permiten números.</small>`;
        console.log("here");
      }

      if (!regexNombreUsuario.test(nombreUsuario.value.replace(/\s/g, ""))) {
        validateFirstName.innerHTML += `
        <small>Solo se permiten letrass.</small>`;
      }
      if (
        !regexApellidoUsuario.test(apellidoUsuario.value.replace(/\s/g, ""))
      ) {
        validateLastName.innerHTML += `
        <small>Solo se permiten letras.</small>`;
      }
      if (!regexTelefonoUsuario.test(telefonoUsuario.value)) {
        validateUserPhone.innerHTML += `
        <small>El tamaño del teléfono no es correcto y solo se permiten números.</small>`;
      }
    }
  } else {
    e.preventDefault();
    validForm.innerHTML = "";
    validateIdUser.innerHTML = "";
    validateFirstName.innerHTML = "";
    validateLastName.innerHTML = "";
    validateUserPhone.innerHTML = "";

    validForm.innerHTML += `
        Todos los campos son requeridos.
    `;

    if (idUsuario.value == "") {
      validateIdUser.innerHTML += `
        <small>Este campo es requerido.</small>`;
    }
    if (nombreUsuario.value == "") {
      validateFirstName.innerHTML += `
        <small>Este campo es requerido.</small>`;
    }
    if (apellidoUsuario.value == "") {
      validateLastName.innerHTML += `
        <small>Este campo es requerido.</small>`;
    }
    if (telefonoUsuario.value == "") {
      validateUserPhone.innerHTML += `
        <small>Este campo es requerido.</small>`;
    }
  }
});

idUsuario.addEventListener("focusout", (e) => {
  validateIdUser.innerHTML = "";
  if (e.target.value == "") {
    validateIdUser.innerHTML += `
    <small>Este campo es requerido.</small>`;
  }
});

idUsuario.addEventListener("input", (e) => {
  const regex = new RegExp("^([a-zA-Z]{0}[0-9]{6,10}[a-zA-Z]{0})$");
  validateIdUser.innerHTML = "";
  if (!regex.test(e.target.value)) {
    validateIdUser.innerHTML += `
    <small>El tamaño de la cedúla no es correcto y solo se permiten números.</small>
    `;
  }
});

nombreUsuario.addEventListener("focusout", (e) => {
  validateFirstName.innerHTML = "";
  if (e.target.value == "") {
    validateFirstName.innerHTML += `
    <small>Este campo es requerido.</small>`;
  }
});

nombreUsuario.addEventListener("input", (e) => {
  const regex = new RegExp("^([a-zA-Z]+)$");
  validateFirstName.innerHTML = "";
  if (!regex.test(e.target.value.replace(/\s/g, ""))) {
    validateFirstName.innerHTML += `
    <small>Solo se permiten letras.</small>
    `;
  }
});

apellidoUsuario.addEventListener("focusout", (e) => {
  validateLastName.innerHTML = "";
  if (e.target.value == "") {
    validateLastName.innerHTML += `
    <small>Este campo es requerido.</small>`;
  }
});

apellidoUsuario.addEventListener("input", (e) => {
  const regex = new RegExp("^([a-zA-Z]+)$");
  validateLastName.innerHTML = "";
  if (!regex.test(e.target.value.replace(/\s/g, ""))) {
    validateLastName.innerHTML += `
      <small>Solo se permiten letras.</small>
      `;
  }
});

telefonoUsuario.addEventListener("focusout", (e) => {
  validateUserPhone.innerHTML = "";
  if (e.target.value == "") {
    validateUserPhone.innerHTML += `
    <small>Este campo es requerido.</small>`;
  }
});

telefonoUsuario.addEventListener("input", (e) => {
  const regex = new RegExp("^([a-zA-Z]{0}[0-9]{10}[a-zA-Z]{0})$");
  validateUserPhone.innerHTML = "";
  if (!regex.test(e.target.value)) {
    validateUserPhone.innerHTML += `
      <small>El tamaño del teléfono no es correcto y solo se permiten números.</small>
      `;
  }
});
