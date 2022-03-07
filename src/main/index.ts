import * as path from 'path';
import { app, BrowserWindow, Menu } from 'electron';
import { APP_NAME } from '@config/index';

declare const DEV_ENTRY: string;

let mainWindow: BrowserWindow|null = null;

function loadHTML(window: BrowserWindow) {
    if (process.env.NODE_ENV === 'production') {
        window.loadFile(path.resolve(__dirname, '../renderer/index.html'))
            .catch(console.error);
        return;
    }
    window.loadURL(DEV_ENTRY);
}

const createWindow = () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
        },
        title: APP_NAME,
        width: 1200,
        height: 675,
        minWidth: 1200,
        minHeight: 675,
        // titleBarStyle: 'hiddenInset',
        fullscreenable: true,
    });
    Menu.setApplicationMenu(null);
    // mainWindow.setFu

    if (process.env.NODE_ENV !== 'production') {
        mainWindow.webContents.openDevTools();
    }
    
    loadHTML(mainWindow);
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
