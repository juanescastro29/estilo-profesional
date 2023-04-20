const { BrowserWindow, ipcMain, Notification } = require("electron");
const { getConection } = require('./database');

let window;

function createWindow() {
  window = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    }
  }) 
  window.loadFile('src/renderer/home.html')
}

ipcMain.on("add-user", async (event, args) => {
  try {
    const connection = await getConection();
    args.idUsuario = parseInt(args.idUsuario);
    await connection.query("INSERT INTO usuarios SET ?", args);
    
    new Notification({
      title: "Estilo Profesional",
      body: "¡Correcto! Usuario agregado correctamente",
    }).show();

  } catch (error) {
    console.log(error);
    new Notification({
      title: "Estilo Profesional",
      body: "¡Error! Usuario ya registrado",
    }).show();
  }
})

ipcMain.on("add-cite", async (event, args) => {
  try {
    const connection = await getConection();
    await connection.query(`INSERT INTO citas SET ?`, args);
    new Notification({
      title: "Estilo Profesional",
      body: "¡Correcto! Cita agregada correctamente",
    }).show();

  } catch (error) {
    console.log(error);
    new Notification({
      title: "Estilo Profesional",
      body: "¡Error! Cita ya registrada",
    }).show();
  }
})

ipcMain.on("get-cites", async (event, args) => {
  const connection = await getConection();
  const data = await connection.query('SELECT *, DATE_FORMAT(fechaCita, "%d/%m/%Y") AS fechaCita FROM citas INNER JOIN usuarios ON citas.idUsuario = usuarios.idUsuario INNER JOIN empleados ON citas.idEmpleado = empleados.idEmpleado INNER JOIN procedimientos ON citas.idProcedimiento = procedimientos.idProcedimiento LIMIT ' + args * 10 + ', 10');
  event.reply("cites", JSON.stringify(data))
})

ipcMain.on("get-users", async (event, args) => {
  const connection = await getConection();
  const data = await connection.query('SELECT * FROM usuarios LIMIT ' + args * 10 + ', 10');
  event.reply("users", JSON.stringify(data))
})

ipcMain.on("get-employes", async (event, args) => {
  const connection = await getConection();
  const data = await connection.query('SELECT * FROM empleados');
  event.reply("employes", JSON.stringify(data))
})

ipcMain.on("get-procedures-hairdresser", async (event, args) => {
  const connection = await getConection();
  const data = await connection.query(`SELECT * FROM procedimientos WHERE idProcedimiento LIKE '%10%'`);
  event.reply("procedures-hairdresser", JSON.stringify(data))
})

ipcMain.on("search-cites", async (event, args) => {
  const connection = await getConection();
  const data = await connection.query(`SELECT *, DATE_FORMAT(fechaCita, "%d/%m/%Y") AS fechaCita FROM citas INNER JOIN usuarios ON citas.idUsuario = usuarios.idUsuario INNER JOIN empleados ON citas.idEmpleado = empleados.idEmpleado INNER JOIN procedimientos ON citas.idProcedimiento = procedimientos.idProcedimiento WHERE usuarios.nombreUsuario LIKE '%` + args.search + `%' OR usuarios.apellidoUsuario LIKE '%`+ args.search + `%' OR usuarios.idUsuario LIKE '%` + args.search + `%' OR citas.estado LIKE '%` + args.search + `%' OR procedimientos.idProcedimiento LIKE '%` + args.search + `%' LIMIT ` + args.page * 10 + `, 10`)
  event.reply("search-cites", JSON.stringify(data))
})

ipcMain.on("search-users", async (event, args) => {
  const connection = await getConection();
  const data = await connection.query(`SELECT * FROM usuarios WHERE usuarios.nombreUsuario LIKE '%` + args.search + `%' OR usuarios.apellidoUsuario LIKE '%`+ args.search + `%' OR usuarios.idUsuario LIKE '%` + args.search + `%' OR usuarios.telefonoUsuario LIKE '%` + args.search + `%' LIMIT ` + args.page * 10 + `, 10`);
  event.reply("search-users", JSON.stringify(data))
})

ipcMain.on("search-user-cite", async (event, args) => {
  const connection = await getConection();
  const data = await connection.query(`SELECT nombreUsuario, apellidoUsuario FROM usuarios WHERE usuarios.idUsuario LIKE '%` + args.search + `%'`);
  event.reply("search-user-cite", JSON.stringify(data))
})

ipcMain.on("delete-user", async (event, args) => {
  const connection = await getConection();
  const data = await connection.query(`DELETE FROM usuarios WHERE usuarios.idUsuario = `+ args +``);
  new Notification({
    title: "Estilo Profesional",
    body: "¡Correcto! Usuario eliminado",
  }).show();
})

module.exports = {
  createWindow
}