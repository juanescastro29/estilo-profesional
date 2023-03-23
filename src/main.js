const { BrowserWindow, ipcMain } = require("electron");
const { getConection } = require('./database');

async function getCites(page) {
  
}

ipcMain.on("hello", () => {
  console.log("hello");
})

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

ipcMain.on("get-cities", async (event, args) => {
  const connection = await getConection();
  const data = await connection.query('SELECT * FROM citas INNER JOIN usuarios, empleados, procedimientos LIMIT ' + args + ', 10');
  event.reply("cities", JSON.stringify(data))
})


module.exports = {
  createWindow
}