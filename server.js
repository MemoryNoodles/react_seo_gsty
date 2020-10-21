const express = require('express');
const cp = require('child_process');
// const LRUCache = require('lru-cache');
const next = require('next');
const { publicRuntimeConfig, serverRuntimeConfig } = require('./next.config');

const { isDev } = publicRuntimeConfig;
const { PORT } = serverRuntimeConfig;

// 判断开发环境和生产环境
const dev = isDev;

const app = next({ dev });
const handle = app.getRequestHandler();
// This is where we cache our rendered HTML pages
// const ssrCache = new LRUCache({
//   max: 100,
//   maxAge: 1000 * 60 * 60, // 1hour
// });
app.prepare().then(() => {
  const server = express();

  server.get(/^\/([a-zA-Z]{1,})-([0-9]{1,})$/, (req, res) => {
    // const { id } = req.params;
    console.log(req.path, "->>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    const id = req.path.split('-')[1];
    return app.render(req, res, req.path.split('-')[0], { id });
  }); //详情页面的条件处理
  //没有输入球队id就处理成404页面
  server.get(/^\/team([-]{0,1})$/, (req, res) => {
    return app.render(req, res, '/error');
  });

  server.get(/^\/trend-([0-9]{1,})&([0-9]{1,})$/, (req, res) => {
    console.log(req.path, "2222");
    const idStr = req.path.split('-')[1];
    const id1 = idStr.split("&")[0];
    const id2 = idStr.split("&")[1];
    return app.render(req, res, req.path.split('-')[0], { id: id1, id2: id2 });

  });


  server.get(/^\/matchDetail([-]{0,1})$/, (req, res) => {
    return app.render(req, res, '/error');
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, err => {
    if (err) throw err;
    const serverUrl = `http://localhost:${PORT}`;
    console.log(`> Ready on ${serverUrl}`);
    // 开发环境自动启动
    if (dev) {
      switch (process.platform) {
        //mac系统使用 一下命令打开url在浏览器
        case 'darwin':
          cp.exec(`open ${serverUrl}`);
          break;
        //win系统使用 一下命令打开url在浏览器
        case 'win32':
          cp.exec(`start ${serverUrl}`);
          break;
        // 默认mac系统
        default:
          cp.exec(`open ${serverUrl}`);
      }
    }
  });
});
