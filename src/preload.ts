// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';

let WINDOW_API = {
    fetchTickers: async(searchText: string) => {
        return await ipcRenderer.invoke("fetchTickers", searchText);
    },
    saveTickers: (tickers: Array<string>) => {
        return ipcRenderer.invoke("saveTickers", tickers);
    },
    loadTickers: () => {
        return ipcRenderer.invoke("loadTickers");
    }
}

contextBridge.exposeInMainWorld('api', WINDOW_API);