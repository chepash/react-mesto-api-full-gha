const helmet = require('helmet');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const celebrate = require('celebrate');

const routes = require('./routes');
const { PORT, DB_ADDRESS, corsOptions } = require('./config');

const { appErrorHandler } = require('./utils/utils');
const { createUser } = require('./controllers/users');
const { login } = require('./controllers/login');
const { auth } = require('./middlewares/auth');
const { validateSignInData, validateSignUpData } = require('./utils/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateSignInData, login);
app.post('/signup', validateSignUpData, createUser);

app.use(auth, routes);

app.use(errorLogger);

app.use(celebrate.errors());
app.use(appErrorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
