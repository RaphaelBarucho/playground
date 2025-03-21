const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const fs = require("fs");
const { contextIsolated } = require('process');

const createWindow = () => {
const win = new BrowserWindow({
    width: 800,
    height: 800, 
    webPreferences: {
        nodeIntegration: true,
        contextIsolated: false,
    }
})

    win.loadFile('./notes/main.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.plataform !== 'darwin') {
        app.quit()
    }
})

ipcMain.on("save-file", async (event, text) => {
    const { filePath } = await dialog.showSaveDialog({
        title: "Salvar arquivo",
        defaultPath: "minha_nota.txt",
        filters: [{ name: "Text Files", extensions: ["txt"] }]
    });

    if (filePath) {
        fs.writeFileSync(filePath, text, "utf-8");
    }
});