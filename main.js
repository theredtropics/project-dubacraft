// main process

const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

app.disableHardwareAcceleration()

let window

const createWindow = () => {
    window = new BrowserWindow({
        width: 800,
        height: 600,
        center: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        }
    })

    window.setMenu(null)
    window.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    ipcMain.on('get-data', (event, title) => {
        const webContents = event.sender
        const w = BrowserWindow.fromWebContents(webContents)
        w.setTitle(title)
    })

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})