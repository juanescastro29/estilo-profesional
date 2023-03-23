const { app } = require('electron')
const { createWindow } = require('./main')

require('./database')
require('electron-reload')(__dirname)

app.allowRenderProcessReuse = false;
app.disableHardwareAcceleration();
app.whenReady().then(createWindow)
