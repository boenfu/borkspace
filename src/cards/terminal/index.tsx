import { ipcRenderer } from 'electron';
import React, { FC, useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

const terminal = new Terminal();
const fitAddon = new FitAddon();

terminal.loadAddon(fitAddon);

terminal.loadAddon({
  activate(te) {
    ipcRenderer.on('node-pty', (_, data) => {
      terminal.write(data);
    });

    te.onData((data) => {
      ipcRenderer.send('node-pty', data);
      console.log(data);
    });

    te.onBinary((data) => {
      const buffer = new Uint8Array(data.length);
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < data.length; ++i) {
        // eslint-disable-next-line no-bitwise
        buffer[i] = data.charCodeAt(i) & 255;
      }

      console.log(buffer);
    });
  },
  dispose() {},
});

const Component: FC = () => {
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapper.current) {
      return;
    }

    terminal.open(wrapper.current);
    fitAddon.fit();

    terminal.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');
  }, [wrapper]);
  return (
    <div
      ref={wrapper}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default {
  title: '终端',
  component: Component,
  w: 6,
  h: 2,
};
