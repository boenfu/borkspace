import os from 'os';
import * as pty from 'node-pty';
import { ipcMain, BrowserWindow } from 'electron';

const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

const ptyProcess = pty.spawn(shell, [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: process.env.HOME,
  env: process.env as any,
});

// eslint-disable-next-line import/prefer-default-export
export function initPty(mainWindow: BrowserWindow) {
  ipcMain.on('node-pty', (_, data: any) => {
    console.log(data);

    ptyProcess.write(data);
  });

  ptyProcess.on('data', (data) => {
    mainWindow.webContents.send('node-pty', data);
  });
}
