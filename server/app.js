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
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', require('./api'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;

