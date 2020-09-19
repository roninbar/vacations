var path = require('path');
var logger = require('morgan');
var express = require('express');
var session = require('express-session');
var MySQLStore = require('express-mysql-session');
var cookieParser = require('cookie-parser');
var passport = require('./util/passport');

var app = express();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'xyzzy',
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore({
        user: 'root',
        database: 'vacations',
    }),
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/user', require('./routes/users'));

app.use(function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.sendStatus(401);
    }
});

app.use('/vacation', require('./routes/vacations'));

module.exports = app;
