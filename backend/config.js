require('dotenv').config();

const { NODE_ENV = 'development' } = process.env;

const JWT_SECRET = NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret';

const { PORT = '3000' } = process.env;
const { DB_ADDRESS = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://praktikum.tk',
    'http://praktikum.tk',
    'https://chepa.nomoredomains.work',
  ],
  credentials: true,
  maxAge: 60, // 60 = 1min кэшируем одинаковые preflight options запросы на 1min
  optionsSuccessStatus: 204,
  // 204 для уверреной работы авторизации через куки в preflight options запросах
};

const limiterOptions = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
};

module.exports = {
  JWT_SECRET,
  PORT,
  DB_ADDRESS,
  corsOptions,
  limiterOptions,
};
