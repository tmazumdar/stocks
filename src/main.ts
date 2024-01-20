import { app, BrowserWindow, ipcMain, net } from 'electron';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
const appDataPath = app.getPath('appData');
const preferencesfilePath = path.resolve(appDataPath, 'tt.preferences.json');
const dailyFilePath = path.resolve(appDataPath, 'tt.daily.json');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}
var mainWindow : BrowserWindow
const createWindow = (): void => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    icon: './src/assets/flying-money.png',
    height: 600,
    width: 900,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    },
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      symbolColor: "black",
      color: "rgba(0,0,0,0)",
      height: 10
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle("fetchTickers", async (event, ...args) => {
  const response = await fetch(`https://api.polygon.io/v3/reference/tickers?search=${args}&active=true&apiKey=HzJHe3u2lVj09fNALzS5R09W2myXV9kI`)
  const body = await response.text();
  return body;
});

ipcMain.handle("fetchGroupedDaily", async (event, ...args) => {
  console.log("Loading data for :", args);
  const response = await fetch(`https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/${args}?adjusted=true&include_otc=true&apiKey=HzJHe3u2lVj09fNALzS5R09W2myXV9kI`)
  let data = await response.text();
  let statsArray = JSON.parse(data).results;

  // read data from saved config if any
  let preferencesFileExists = fs.existsSync(preferencesfilePath);

  if (preferencesFileExists && statsArray) {
    let jsonData = fs.readFileSync(preferencesfilePath, "utf8");
    var savedTickers = JSON.parse(jsonData);
    let filteredArray = statsArray.filter((s: any) => savedTickers.indexOf(s.T) >= 0);
    return JSON.stringify(filteredArray);
  }
});

ipcMain.handle("fetchPrevClose", async (event, ...args) => {
  const response = await fetch(`https://api.polygon.io/v2/aggs/ticker/${args}/prev?adjusted=true&apiKey=HzJHe3u2lVj09fNALzS5R09W2myXV9kI`)
  return await response.text(); 
});

ipcMain.handle("saveTickers", async(event, data) => {
  let jsonData = JSON.stringify(data);
  // write to AppData folder
  fs.writeFileSync(preferencesfilePath, jsonData);
});

ipcMain.handle("loadTickers", (event, ...args) => {
 // read data from saved config if any
  let preferencesFileExists = fs.existsSync(preferencesfilePath);
  
  if (preferencesFileExists) {
    return fs.readFileSync(preferencesfilePath, "utf8");
  }
});

ipcMain.handle("removeTicker", (event, ...args) => {
  // read data from saved config if any
   let preferencesFileExists = fs.existsSync(preferencesfilePath);
   
   if (preferencesFileExists) {
     let jsonData = fs.readFileSync(preferencesfilePath, "utf8");
     var data = JSON.parse(jsonData);
     var newTickerArray = data.filter((t: string) => {
      return t !== args[0]
     });
     let saveData = JSON.stringify(newTickerArray);
     fs.writeFileSync(preferencesfilePath, saveData);
     return saveData;
   }
 });

app.whenReady().then(() => {
  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

declare global {
  interface Window {
    api: any
  }
}