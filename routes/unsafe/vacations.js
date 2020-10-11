const { getSqlConnection } = require('../../entities/connect');
const { getVacation, getAllVacations } = require('../../entities/vacation/retrieve');
const { addVacation } = require('../../entities/vacation/create');
const { deleteVacation } = require('../../entities/vacation/delete');
const _ = require('lodash');

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

// Add a new vacation.
router.post('/', async function ({ user: { id: userId }, body: vacation }, res) {
    // eslint-disable-next-line array-element-newline
    const expectedKeys = ['destination', 'from', 'to', 'price', 'description', 'image'];
    if (_.isEmpty(_.xor(expectedKeys, Object.keys(vacation)))) {
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
router.patch('/:id', async function ({ params: { id: vacationId }, user: { id: userId }, body: { image, destination, from, to, description, price }, vacation }, res, next) {
    const values = { image, destination, from, to, description, price };
    if (!_.isEmpty(values)) {
        if (vacation) {
            const assignments = Object.keys(values)
                .filter(key => typeof values[key] === 'string')
                .map(col => `\`${col}\` = :${col}`)
                .join(', ')
                .trim();
            const sql = `UPDATE \`vacation\` SET ${assignments} WHERE \`id\` = :vacationId`;
            const conn = await getSqlConnection();
            try {
                const [{ affectedRows }] = await conn.execute({ sql, namedPlaceholders: true }, { vacationId, ...values });
                return affectedRows > 0
                    ? res.json(await getVacation(userId, vacationId))
                    : res.sendStatus(404);
            } finally {
                await conn.release();
            }
        } else {
            return res.sendStatus(404);
        }
    }
    else {
        return next();
    }
});

module.exports = router;

