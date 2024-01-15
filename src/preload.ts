// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron')

let WINDOW_API = {
    getTickers: async(searchText: string) => {
        return await ipcRenderer.invoke("fetchTickers", searchText);
    },
    saveTickers: async (tickers: Array<string>) => {
        return await ipcRenderer.invoke("saveTickers", tickers);
    }
}

contextBridge.exposeInMainWorld('api', WINDOW_API);