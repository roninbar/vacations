/* eslint-disable dot-notation */
const path = require('path');
const logger = require('morgan');
const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const cookieParser = require('cookie-parser');
const passport = require('./util/passport');

const app = express();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: process.env['SECRET'],
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore({
        user: process.env['DBUSER'],
        password: process.env['DBPASS'],
        database: process.env['DBNAME'],
    }),
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/user', require('./routes/users'));

// Block unauthenticated requests from getting any further (e.g. to /vacation).
app.use(function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.sendStatus(401);
    }
});

app.use('/vacation', require('./routes/vacations'));

// Block unauthorized requests from invoking unsafe operations.
app.use(function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === 'admin') {
        return next();
    } else {
        return res.sendStatus(403);
    }
});

app.use('/vacation', require('./routes/unsafe/vacations'));

module.exports = app;

