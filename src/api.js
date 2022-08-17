const express = require('express');
require('express-async-errors');
const errorHandler = require('./middlewares/error');
const loginRoute = require('./routes/login');
const userRoute = require('./routes/user');
const categoriesRoute = require('./routes/categories');

const app = express();

app.use(express.json());
app.use('/login', loginRoute);
app.use('/user', userRoute);
app.use('/categories', categoriesRoute);

app.use(errorHandler);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
