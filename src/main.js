const { BrowserWindow, ipcMain } = require("electron");
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

ipcMain.on("get-cites", async (event, args) => {
  const connection = await getConection();
  const data = await connection.query('SELECT *, DATE_FORMAT(fechaCita, "%d/%m/%Y") AS fechaCita FROM citas INNER JOIN usuarios, empleados, procedimientos LIMIT ' + args * 10 + ', 10');
  event.reply("cites", JSON.stringify(data))
})

ipcMain.on("search-cites", async (event, args) => {
  const connection = await getConection();
  const data = await connection.query(`SELECT *, DATE_FORMAT(fechaCita, "%d/%m/%Y") AS fechaCita FROM citas INNER JOIN usuarios, empleados, procedimientos WHERE usuarios.nombreUsuario LIKE '%` + args.search + `%' OR usuarios.apellidoUsuario LIKE '%`+ args.search + `%' OR usuarios.idUsuario LIKE '%` + args.search + `%' OR citas.estado LIKE '%` + args.search + `%' OR procedimientos.idProcedimiento LIKE '%` + args.search + `%' LIMIT ` + args.page * 10 + `, 10`);
  event.reply("search", JSON.stringify(data))
})


module.exports = {
  createWindow
}