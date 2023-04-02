const { ipcRenderer } = require("electron");

const idUsuario= document.getElementById('id')
const nombreUsuario= document.getElementById('name')
const apellidoUsuario= document.getElementById('lastName')
const telefonoUsuario= document.getElementById('phone')
const btnAgregar= document.getElementById('btnAgregar')

btnAgregar.addEventListener('click', () => {
    const user={
        idUsuario: idUsuario.value,
        nombreUsuario: nombreUsuario.value,
        apellidoUsuario: apellidoUsuario.value,
        telefonoUsuario: telefonoUsuario.value 
    }
    ipcRenderer.send('add-user',user)
}) 


