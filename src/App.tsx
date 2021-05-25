import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Button, Drawer } from 'antd';
import { useBoolean, useKeyPress } from 'ahooks';

// import Darkmode from 'darkmode-js';
import './App.global.css';
import Card from './components/card';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Home = () => {
  return (
    <ResponsiveGridLayout
      compactType={null}
      onDrop={(_, layoutItem) => {
        console.log(
          `Dropped element props:\n${JSON.stringify(
            layoutItem,
            ['x', 'y', 'w', 'h'],
            2
          )}`
        );
      }}
      layouts={{
        lg: [
          { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
          {
            i: 'b',
            x: 1,
            y: 0,
            w: 3,
            h: 2,
            isResizable: true,
          },
          {
            i: 'c',
            x: 4,
            y: 0,
            w: 1,
            h: 2,
          },
        ],
      }}
      breakpoints={{
        lg: 3000,
        md: 1920,
        sm: 1440,
        xs: 960,
        xxs: 640,
        xxxs: 480,
      }}
      cols={{ lg: 20, md: 12, sm: 8, xs: 6, xxs: 4, xxxs: 2 }}
      rowHeight={60}
      isDroppable
    >
      <Card key="a" />
      <Card key="b" />
      <Card key="c" />
    </ResponsiveGridLayout>
  );
};

export default function App() {
  const [visible, { setTrue, setFalse }] = useBoolean();
  useKeyPress('ctrl.n', setTrue);
  return (
    <>
      <div id="app_nav">拖拽</div>

      <Router>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
      <Drawer
        title="选择卡片"
        placement="bottom"
        onClose={setFalse}
        closable
        mask={false}
        visible={visible}
      >
        <div
          {...({
            draggable: true,
            unselectable: 'on',
          } as any)}
        >
          <Button>测试</Button>
        </div>
      </Drawer>
    </>
  );
}
