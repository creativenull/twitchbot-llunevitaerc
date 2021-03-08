const Koa = require('koa');
const storage = require('node-persist');
const { accessToken } = require('./config');
const { fetchAccessToken } = require('./api/auth');

function startServer() {
  const app = new Koa();
  app.use(async (ctx) => {
    ctx.body = 'Hello World';
  });

  app.listen(3000);
}

// Set access token for first time run
if (!accessToken) {
  fetchAccessToken()
    .then((res) => res.json())
    .then((res) => {
      // Store to local db
      storage.setItem('accessToken', res.access_token).then(() => {
        startServer();
      });
    });
} else {
  startServer();
}
