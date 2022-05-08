import * as path from 'path';
import { app, BrowserWindow, ipcMain, Menu } from 'electron';
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
    app.commandLine.appendSwitch('disable-web-security');
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false,
        },
        title: APP_NAME,
        width: 1200,
        height: 675,
        minWidth: 1200,
        minHeight: 675,
        frame: false,
        titleBarStyle: 'hiddenInset',
        fullscreenable: true,
        show: false,
    });
    mainWindow.setAspectRatio(16/9);
    Menu.setApplicationMenu(null);
    // mainWindow.setFu

    if (process.env.NODE_ENV !== 'production') {
        mainWindow.webContents.openDevTools();
    }
    // mainWindow.webContents.openDevTools();
    
    loadHTML(mainWindow);
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    mainWindow.on('ready-to-show', () => {
        mainWindow?.show();
    });

    ipcMain.on('window-control', (event, args) => {
        switch (args) {
            case 'minimize':
                mainWindow?.minimize();
                break;
            case 'unmaximize':
                mainWindow?.unmaximize();
                break;
            case 'restore':
                // if (process.platform === 'darwin') {
                    
                // }
                if (mainWindow?.isFullScreen()) {
                    mainWindow.setFullScreen(false);
                }
                mainWindow?.unmaximize();
                break;
            case 'maximize':
                mainWindow?.maximize();
                break;
            case 'close':
                mainWindow && mainWindow.close();
                break;
            case 'openDev':
                mainWindow?.webContents.openDevTools();
                break;
            case 'fullscreen':
                mainWindow?.setFullScreen(true);
                break;
            default:
                break;
        }

        event.returnValue = 'successed';
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
