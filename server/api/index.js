const express = require('express');
const { Router } = express;

const api = new Router();

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

module.exports = api;

