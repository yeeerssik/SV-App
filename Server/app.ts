import express, { raw } from 'express';
import mongoose from 'mongoose';

import { registerValidation } from './validations/auth' // компилить

import checkAuth from './utils/checkAuth';

import * as UserController from './controllers/UserController';

mongoose
    .connect('mongodb+srv://yers:password@diploma-project-cluster.sozejqp.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log('DB error: ', err));

const app = express();

app.use(express.json()); // подключение json

app.get('/checkHealth', UserController.checkHealth);

app.post('/auth/login', UserController.login);

app.post('/auth/register', registerValidation, UserController.register);

app.get('/auth/me', checkAuth, UserController.getMe);

app.on('error', (err) => {
    if (err) {
        return console.log(err);
    }
});

app.listen(3000, () => {
    console.log('OK');
}); // запуск сервера на порту 
