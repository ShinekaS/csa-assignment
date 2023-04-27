const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//New route files added to the repo
const basketsRouter = require('./routes/baskets');
const itemsRouter = require('./routes/items');
//const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');

app.use('/baskets', basketsRouter);
app.use('/items', itemsRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);


// after the logger and before the router imports
const session = require('express-session');
const passport = require('passport');
require('./config/passport')(passport);

const authRouter = require('./routes/auth');
// ...
app.use('/auth', authRouter);

// ...

// add this right after the middleware using `express.static()`
// just before the router middleware
app.use(
  session({
    secret: 'my_passport_key0426',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// ...

app.use('/', indexRouter);
app.use('/users', usersRouter);


module.exports = app;
