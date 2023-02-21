import * as path from 'path';
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as UserController from './controllers/UserController';
import checkAuth from './utils/checkAuth';
import * as ClientsController from './controllers/ClientsController';
import ClientModel from './models/client';

dotenv.config();

const PORT = process.env.PORT || 3000;
// const URI_PREFIX = '/api/clients';

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(`DB error: ${err}`));

const app = express();

app.use('/static', express.static('./build/client'));
app.use(express.json());
app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', async (req, res) => {
  res.render('index');
});

app.post('/signup', UserController.signup);
app.post('/login', UserController.login);
app.get('/logout', checkAuth, UserController.logout);

app.post('/clients', checkAuth, ClientsController.addClient);
app.put('/clients', checkAuth, async (req, res) => {
  try {
    const data = await ClientModel.findOneAndUpdate(
      { clientId: req.body.clientId },
      {
        clientId: req.body.clientId,
        name: req.body.name,
        surname: req.body.surname,
        midname: req.body.midname,
        contacts: req.body.contacts,
        user: req.user,
      },
      {
        new: true,
      },
    );
    res.status(201).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Ошибка при создании клиента. Попробуйте еще раз позже.' });
  }
});
app.get('/clients', checkAuth, ClientsController.getAllClients);
app.delete('/clients/:id', checkAuth, ClientsController.removeClient);

app.listen(PORT, () => {
  console.log(`Сервер CRM запущен. Вы можете использовать его по адресу http://localhost:${PORT}`);
});
