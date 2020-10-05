const { getVacation, getAllVacations } = require('../entities/vacation/retrieve');
const { followVacation, unfollowVacation } = require('../entities/vacation/update');
const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

// GET all the vacations.
router.get('/all', async function ({ user: { id: userId } }, res) {
    res.json(await getAllVacations(userId));
});

// GET one vacation.
router.get('/:id', async function ({ params: { id: vacationId }, user: { id: userId } }, res) {
    const vacation = await getVacation(userId, vacationId);
    if (vacation) {
        res.json(vacation);
    } else {
        res.sendStatus(404);
    }
});

// Follow/unfollow vacation.
router.patch('/:id', async function ({ params: { id: vacationId }, user: { id: userId }, body: { isFollowing } }, res) {
    if (typeof isFollowing !== 'boolean') {
        res.sendStatus(400);
    } else {
        const vacation = await getVacation(userId, vacationId);
        if (vacation) {
            await (isFollowing ? followVacation : unfollowVacation)(userId, vacationId);
            res.json(await getVacation(userId, vacationId));
        } else {
            res.sendStatus(404);
        }
    }
});

module.exports = router;

