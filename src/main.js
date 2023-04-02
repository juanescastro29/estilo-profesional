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
    const data = await connection.query("INSERT INTO usuarios SET ?", args);
    
    new Notification({
      title: "Estilo Profesional",
      body: "Usuario agregado correctamente",
    }).show();
  } catch (error) {
    console.log(error);
  }
})

ipcMain.on("get-cites", async (event, args) => {
  const connection = await getConection();
  const data = await connection.query('SELECT *, DATE_FORMAT(fechaCita, "%d/%m/%Y") AS fechaCita FROM citas INNER JOIN usuarios, empleados, procedimientos LIMIT ' + args * 10 + ', 10');
  event.reply("cites", JSON.stringify(data))
})

ipcMain.on("get-users", async (event, args) => {
  const connection = await getConection();
  const data = await connection.query('SELECT * FROM usuarios LIMIT ' + args * 10 + ', 10');
  event.reply("users", JSON.stringify(data))
})

ipcMain.on("search-cites", async (event, args) => {
  const connection = await getConection();
  const data = await connection.query(`SELECT *, DATE_FORMAT(fechaCita, "%d/%m/%Y") AS fechaCita FROM citas INNER JOIN usuarios, empleados, procedimientos WHERE usuarios.nombreUsuario LIKE '%` + args.search + `%' OR usuarios.apellidoUsuario LIKE '%`+ args.search + `%' OR usuarios.idUsuario LIKE '%` + args.search + `%' OR citas.estado LIKE '%` + args.search + `%' OR procedimientos.idProcedimiento LIKE '%` + args.search + `%' LIMIT ` + args.page * 10 + `, 10`)
  event.reply("search-cites", JSON.stringify(data))
})

ipcMain.on("search-users", async (event, args) => {
  const connection = await getConection();
  const data = await connection.query(`SELECT * FROM usuarios WHERE usuarios.nombreUsuario LIKE '%` + args.search + `%' OR usuarios.apellidoUsuario LIKE '%`+ args.search + `%' OR usuarios.idUsuario LIKE '%` + args.search + `%' OR usuarios.telefonoUsuario LIKE '%` + args.search + `%' LIMIT ` + args.page * 10 + `, 10`);
  event.reply("search-users", JSON.stringify(data))
})

module.exports = {
  createWindow
}