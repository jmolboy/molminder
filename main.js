const electron = require('electron');
// Module to control application life.
const {app} = electron;
// Module to create native browser window.
const {BrowserWindow} = electron;

const Menu = electron.Menu;
const Tray = electron.Tray;

const ipc = require('electron').ipcMain;
const dialog = require('electron').dialog;

var appIcon = null;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({width: 1238, height: 770, frame: true});

    // and load the index.html of the app.
    win.loadURL(`file://${__dirname}/index.html`);

    // Open the DevTools.
    win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', function() {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null;
    });
}

let filepath = '';//文件路径

/*create menu*/
let template = [
	{
	    label: '文件',
	    submenu: [{
	        label: '新建',
	        accelerator: 'CmdOrCtrl+N',
	        click: function (item, focusedWindow) {
	            if (focusedWindow) {
	                win.webContents.send('new-file', '');
	            }
	        }
	    },{
	        label: '打开',
	        accelerator: 'CmdOrCtrl+O',
	        click: function (item, focusedWindow) {
	            if (focusedWindow) {
	                const options = {
	                    title: '打开',
	                    filters: [
	                        {name: 'Json', extensions: ['json']}
	                    ],
	                    properties: ['openFile', 'openDirectory']
	                }

	                dialog.showOpenDialog(options, function (files) {
	                    if (!files && files.length < 1) {
	                        dialog.showErrorBox('错误', '请选择要打开的文件')
	                        return;
	                    }

	                    filepath = files[0];
	                    win.webContents.send('open-file', filepath);
	                })
	            }
	        }
	    },{
	        label: '保存',
	        accelerator: 'CmdOrCtrl+S',
	        click: function (item, focusedWindow) {
	            if (focusedWindow) {
	                const options = {
	                    title: '保存脑图',
	                    filters: [
	                        {name: 'Json', extensions: ['json']}
	                    ]
	                }

	                if (filepath != '') {
	                    win.webContents.send('save-file', filepath);
	                }
	                else {
	                    dialog.showSaveDialog(options, function (filename) {
	                        filepath = filename;
	                        win.webContents.send('save-file', filepath);
	                    })
	                }
	            }
	        }
	    },{
	        label: '另存为',
	        accelerator: 'CmdOrCtrl+Shift+S',
	        click: function (item, focusedWindow) {
	            if (focusedWindow) {
	                const options = {
	                    title: '另存为',
	                    filters: [
	                        {name: 'Json', extensions: ['json']}
	                    ]
	                }
	                dialog.showSaveDialog(options, function (filename) {
	                    filepath = filename;
	                    win.webContents.send('save-file', filepath);
	                })
	            }
	        }
	    }]
	},{
    label: '视图',
    submenu: [{
        label: '全屏幕',
        accelerator: (function () {
            if (process.platform === 'darwin') {
                return 'Ctrl+Command+F'
            } else {
                return 'F11'
            }
        })(),
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
            }
        }
    }, {
        label: '开发者工具',
        accelerator: (function () {
            if (process.platform === 'darwin') {
                return 'Alt+Command+I'
            } else {
                return 'Ctrl+Shift+I'
            }
        })(),
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                focusedWindow.toggleDevTools()
            }
        }
    }]
}, {
    label: '窗口',
    role: 'window',
    submenu: [{
        label: '最小化',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
    }, {
        label: '关闭',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
    }]
}]

function addUpdateMenuItems(items, position) {
    const version = electron.app.getVersion()
    let updateItems = [{
        label: 'Version '+version,
        enabled: false
    }, {
        label: '检查更新',
        enabled: false,
        key: 'checkingForUpdate'
    }, {
        label: '检查更新',
        visible: false,
        key: 'checkForUpdate',
        click: function () {
            require('electron').autoUpdater.checkForUpdates()
        }
    }, {
        label: '重启以安装更新',
        enabled: true,
        visible: false,
        key: 'restartToUpdate',
        click: function () {
            require('electron').autoUpdater.quitAndInstall()
        }
    }]

    items.splice.apply(items, [position, 0].concat(updateItems))
}

if (process.platform === 'darwin') {
    const name = electron.app.getName()
    template.unshift({
        label: name,
        submenu: [{
            label: `关于 ${name}`,
            role: 'about'
        }, {
            type: 'separator'
        }, {
            label: '偏好设置',
            role: 'services',
            submenu: []
        }, {
            type: 'separator'
        }, {
            label: `隐藏 ${name}`,
            accelerator: 'Command+H',
            role: 'hide'
        }, {
            label: '隐藏其它',
            accelerator: 'Command+Alt+H',
            role: 'hideothers'
        }, {
            label: '显示全部',
            role: 'unhide'
        }, {
            type: 'separator'
        }, {
            label: '退出',
            accelerator: 'Command+Q',
            click: function () {
                app.quit()
            }
        }]
    })
    // Window menu.
    template[3].submenu.push({
        type: 'separator'
    }, {
        label: 'Bring All to Front',
        role: 'front'
    })

    addUpdateMenuItems(template[0].submenu, 1)
}

if (process.platform === 'win32') {
    const helpMenu = template[template.length - 1].submenu
    addUpdateMenuItems(helpMenu, 0)
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {
    createWindow();
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin')
    {
        app.quit();
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null)
    {
        createWindow();
    }
});


ipc.on('save-file-nopath', function (event) {
    dialog.showErrorBox('错误', '请选择要保存的路径')
})

ipc.on('open-file-nopath', function (event) {
    dialog.showErrorBox('错误', '请选择要打开的文件')
})

ipc.on('file-content-error', function (event) {
    dialog.showErrorBox('错误', '文件内容无法识别')
})

