const { BrowserWindow } = require("electron");

let window

function createWindow() {
  window = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  }) 
  window.loadFile('src/renderer/home.html')

}

module.exports = {
  createWindow
}