// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';

let WINDOW_API = {
    fetchTickers: async(searchText: string) => {
        return await ipcRenderer.invoke("fetchTickers", searchText);
    },
    fetchGroupedDaily: async(searchText: string) => {
        return await ipcRenderer.invoke("fetchGroupedDaily", searchText);
    },
    fetchPrevClose: async(searchText: string) => {
        return await ipcRenderer.invoke("fetchPrevClose", searchText);
    },
    saveTickers: (tickers: Array<string>) => {
        return ipcRenderer.invoke("saveTickers", tickers);
    },
    loadTickers: () => {
        return ipcRenderer.invoke("loadTickers");
    },
    removeTicker: (ticker: string) => {
        return ipcRenderer.invoke("removeTicker", ticker);
    }
}

contextBridge.exposeInMainWorld('api', WINDOW_API);