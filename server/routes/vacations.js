var { getAllVacations } = require('../entities/vacation/retrieve');
var { followVacation, unfollowVacation } = require('../entities/vacation/update');
var express = require('express');
var router = express.Router();

// GET all the vacations.
router.get('/all', async function ({ user: { id: userId } }, res) {
    res.json(await getAllVacations(userId));
});

// Follow vacation.
router.put('/:id/follow', async function ({ params: { id: vacationId }, user: { id: userId } }, res) {
    const insertId = await followVacation(userId, vacationId);
    res.sendStatus(insertId > 0 ? 201 : 204);
});

// Unfollow vacation.
router.delete('/:id/follow', async function ({ params: { id: vacationId }, user: { id: userId } }, res) {
    const affectedRows = await unfollowVacation(userId, vacationId);
    res.sendStatus(affectedRows > 0 ? 204 : 404);
});

module.exports = router;

