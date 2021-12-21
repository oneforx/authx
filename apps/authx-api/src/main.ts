import * as express from 'express';
import AccountController from './app/account/account.controller'
import AuthController from './app/auth/auth.controller'
import ClientController from './app/client/client.controller'

const greeting = { message: 'Welcome to api!' };

const app = express();

app.get('/api', (req, res) => {
  res.send(greeting);
});

app.use("/account", AccountController);
app.use("/auth", AuthController);
app.use("/client", ClientController);

const port = process.env.port || 3333;

const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});

server.on('error', console.error);
