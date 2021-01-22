/* eslint-disable dot-notation */
const path = require('path');
const logger = require('morgan');
const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const cookieParser = require('cookie-parser');
const passport = require('./util/passport');

const secret = process.env['SECRET'] || '';
const host = process.env['DBHOST'] || 'localhost';
const port = process.env['DBPORT'] || '3306';
const user = process.env['DBUSER'] || 'root';
const password = process.env['DBPASS'] || '';
const database = process.env['DBNAME'] || 'vacations';

const app = express();

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret,
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore({ host, port, user, password, database }),
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', require('./api'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;

