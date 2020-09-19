var { getAllVacations } = require('../entities/vacation/retrieve');
var express = require('express');
var router = express.Router();

// GET all the vacations.
router.get('/all', async function (req, res, next) {
    res.json(await getAllVacations(req.user));
});

module.exports = router;

