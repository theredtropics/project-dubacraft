const { contextBridge, ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => { 
    document.getElementById('test').innerText = `Chrome ${ process.versions['chrome']}, Node ${ process.versions['node'] }`
}) 

contextBridge.exposeInMainWorld('API', {
    setTitle: title => ipcRenderer.send('get-data', title)
})