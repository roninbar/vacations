const _ = require('lodash');
const { getVacation, getAllVacations } = require('../../entities/vacation/retrieve');
const { addVacation } = require('../../entities/vacation/create');
const { updateVacation } = require('../../entities/vacation/update');
const { deleteVacation } = require('../../entities/vacation/delete');
const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

// eslint-disable-next-line array-element-newline
const knownKeys = ['destination', 'from', 'to', 'price', 'description', 'image'];

// Add a new vacation.
router.post('/', async function ({ user: { id: userId }, body: vacation }, res) {
    if (_.isEmpty(_.xor(knownKeys, Object.keys(vacation)))) {
        const id = await addVacation(vacation);
        return id > 0
            ? res
                .status(201)
                .set('Location', `/vacation/${id}`)
                .json(await getAllVacations(userId))
            : res.sendStatus(500);
    }
    else {
        return res.sendStatus(400);
    }
});

// Delete vacation.
router.delete('/:id', async function ({ params: { id: vacationId }, user: { id: userId }, vacation }, res) {
    if (vacation) {
        const affectedRows = await deleteVacation(vacationId);
        return affectedRows > 0 ? res.json(await getAllVacations(userId)) : res.sendStatus(500);
    }
    else {
        return res.sendStatus(404);
    }
});

// Change other fields in the vacation, such as the destination or the dates.
router.patch('/:id', async function ({ params: { id: vacationId }, user: { id: userId }, body, vacation }, res, next) {
    const newValues = _.pick(body, knownKeys);
    if (!_.isEmpty(newValues)) {
        if (vacation) {
            const affectedRows = await updateVacation(vacationId, newValues);
            return affectedRows > 0
                ? res.json(await getVacation(userId, vacationId))
                : res.sendStatus(304); // Unchanged
        } else {
            return res.sendStatus(404);
        }
    }
    else {
        return next();
    }
});

module.exports = router;

