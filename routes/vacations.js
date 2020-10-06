const { getVacation, getAllVacations } = require('../entities/vacation/retrieve');
const { followVacation, unfollowVacation } = require('../entities/vacation/update');
const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

// GET all the vacations.
router.get('/all', async function ({ user: { id: userId } }, res) {
    res.json(await getAllVacations(userId));
});

// Start handling every request for a specific vacation by retrieving the vacation from the database.
router.all('/:id', async function (req, res, next) {
    const { params: { id: vacationId }, user: { id: userId } } = req;
    const vacation = await getVacation(userId, vacationId);
    // eslint-disable-next-line require-atomic-updates
    req.vacation = vacation;
    return next();
});

// GET one vacation.
router.get('/:id', async function ({ vacation }, res) {
    if (vacation) {
        return res.json(vacation);
    } else {
        return res.sendStatus(404);
    }
});

// Follow/unfollow vacation.
router.patch('/:id', async function ({ params: { id: vacationId }, user: { id: userId }, body: { isFollowing } }, res, next) {
    if (typeof isFollowing === 'boolean') {
        await (isFollowing ? followVacation : unfollowVacation)(userId, vacationId);
        return res.json(await getVacation(userId, vacationId));
    } else {
        return next();
    }
});

module.exports = router;

