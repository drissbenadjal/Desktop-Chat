import { lstat } from 'node:fs/promises'
import { cwd } from 'node:process'
import { ipcRenderer } from 'electron'

const CLOSE_BTN = {
  window: {
    minimize: () => ipcRenderer.send("minimize"),
    maximize: () => ipcRenderer.send("maximize"),
    close: () => ipcRenderer.send("close"),
    profile: () => ipcRenderer.send("profile"),
  },
};

export default CLOSE_BTN;

ipcRenderer.on('main-process-message', (_event, ...args) => {
  console.log('[Receive Main-process message]:', ...args)
})

lstat(cwd()).then(stats => {
  console.log('[fs.lstat]', stats)
}).catch(err => {
  console.error(err)
})

ipcRenderer.on('offline-status-changed', (event, status) => {
  console.log(status ? 'offline' : 'online')
})