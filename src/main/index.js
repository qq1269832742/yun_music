'use strict'

import { app, protocol, BrowserWindow, Tray, Menu, ipcMain, dialog, crashReporter } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
import * as path from 'path'
import { format as formatUrl } from 'url'
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let appIcon = null;
const notes = [{
        title: '音乐名称',
        contents: 'muiscName'
    },
    {
        title: '退出',
        contents: 'exit'
    }
];
const trayLogoName = "icon";
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    { scheme: 'app', privileges: { secure: true, standard: true } }
])

function addNoteToMenu(note) {
    return {
        label: note.title,
        type: 'normal',
        click: () => {
            dialog.showMessageBox({
                title: '错误',
                type: 'error',
                message: `${note.title}功能还没有开始`
            })
        }
    }
}

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1020,
        height: 668,
        title: "卫卫云音乐",
        minWidth: 1020,
        minHeight: 668,
        frame: false,
        show: false,
        webPreferences: {
            // Use pluginOptions.nodeIntegration, leave this alone
            // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
            nodeIntegration: true, // process.env.ELECTRON_NODE_INTEGRATION
            enableRemoteModule: true,
            webSecurity: false
        },
        frame: false,
        icon: `static/${trayLogoName}.ico`
    })

    // if (process.env.WEBPACK_DEV_SERVER_URL) {
    //     // Load the url of the dev server if in development mode
    //     win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    //         // if (!process.env.IS_TEST) win.webContents.openDevTools()
    // } else {
    //     createProtocol('app')
    //         // Load the index.html when not in development
    //     win.loadURL('app://./index.html')
    // }
    if (isDevelopment) {
        win.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
    } else {
        win.loadURL(formatUrl({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file',
            slashes: true
        }))
    }
    win.on('closed', () => {
        win = null
    })
    win.on('ready-to-show', function() {
        win.show() // 初始化后再显示
    })

    if (isDevelopment) {
        window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
    } else {
        window.loadURL(formatUrl({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file',
            slashes: true
        }))
    }
}
//启用崩溃监控
crashReporter.start({
        productName: 'YourName',
        companyName: 'YourCompany',
        submitURL: 'https://your-domain.com/url-to-submit',
        uploadToServer: true
    })
    // Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async() => {
        if (isDevelopment && !process.env.IS_TEST) {
            // Install Vue Devtools
            try {
                await installExtension(VUEJS_DEVTOOLS)
            } catch (e) {
                console.error('Vue Devtools failed to install:', e.toString())
            }
        }
        // 创建一个带图标的托盘应用
        appIcon = new Tray(`static/${trayLogoName}.ico`);
        // 为托盘应用创建上下文菜单，迭代并添加为菜单项
        let contextMenu = Menu.buildFromTemplate(notes.map(addNoteToMenu));
        appIcon.setToolTip('卫卫云音乐');

        // 将上下文菜单绑定到托盘应用上
        appIcon.setContextMenu(contextMenu);
        createWindow()
    })
    // 1. 窗口 最小化
ipcMain.on('window-min', function() { // 收到渲染进程的窗口最小化操作的通知，并调用窗口最小化函数，执行该操作
    win.minimize();
})

// 2. 窗口 最大化、恢复
ipcMain.on('window-max', function() {
    if (win.isMaximized()) { // 为true表示窗口已最大化
        win.restore(); // 将窗口恢复为之前的状态.
    } else {
        win.maximize();
    }
})

// 3. 关闭窗口
ipcMain.on('window-close', function() {
    win.close();
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}