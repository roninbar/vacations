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
        host: process.env['DBHOST'],
        port: process.env['DBPORT'],
        user: process.env['DBUSER'],
        password: process.env['DBPASS'],
        database: process.env['DBNAME'],
    }),
}));
app.use(passport.initialize());
app.use(passport.session());

const api = new express.Router();

api.use('/user', require('./routes/users'));

// Block unauthenticated requests from getting any further (e.g. to /vacation).
api.use(function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.sendStatus(401);
    }
});

api.use('/vacation', require('./routes/vacations'));

// Block unauthorized requests from invoking unsafe operations.
api.use(function (req, res, next) {
    if (req.isAuthenticated() && req.user.role === 'admin') {
        return next();
    } else {
        return res.sendStatus(403);
    }
});

api.use('/vacation', require('./routes/unsafe/vacations'));

// Any request that was not handled by the previous middleware must be invalid.
api.use('/vacation', function (req, res) {
    return res.sendStatus(400);
});

app.use('/api', api);

module.exports = app;

