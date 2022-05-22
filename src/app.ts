import * as express from 'express';

import * as route_login from './LOGIC/route_login';
import * as redis from './DATABASE/redis';
class App {
  public application: express.Application;

  constructor() {
    this.application = express();
  }
}

const app = new App().application;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/', (req, res) => {
  res.send("hello, world!");
});

app.get('/health', (req, res) => {
  res.send("OK");
});

app.get('/admin', (req, res) => {
  console.log("/admin");
  res.send("TODO");
});

app.post('/setData', async (req, res) => {
  const key = req.body.key;
  const value = req.body.value;
  const result = await redis.setData(key, value);
  res.send(result);
})

app.get('/getData', async (req, res) => {
  const key = req.query.key as string;
  const result = await redis.getData(key);
  res.send(result);
})

app.post('/account/sign_up', async (req, res) => {
  const result = await route_login.signUp(req);
  res.send(result);
})

app.post('/account/confirm/email', async (req, res) => {
  const result = await route_login.confirmEmail(req);
  res.send(result);
})

app.post('/login', async (req, res) => {
  const result = await route_login.login(req);
  res.send(result);
})

app.listen(4000, () => console.log('start'));
