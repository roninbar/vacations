const { getSqlConnection } = require('../../entities/connect');
const { getAllVacations, getVacation } = require('../../entities/vacation/retrieve');
const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

// Delete vacation.
router.delete('/:id', async function ({ params: { id: vacationId }, user: { id: userId } }, res) {
    const conn = await getSqlConnection();
    try {
        conn.execute('DELETE FROM `vacation` WHERE `id` = ?', [vacationId]);
    }
    finally {
        conn.release();
    }
    res.json(await getAllVacations(userId));
});

// Change other fields in the vacation, such as the destination or the dates.
router.patch('/:id', async function ({ params: { id: vacationId }, user: { id: userId }, body: { destination, from, to, description, price } }, res, next) {
    const body = { destination, from, to, description, price };
    const assignments = Object.keys(body)
        .filter(key => typeof body[key] === 'string')
        .map(col => `\`${col}\` = :${col}`)
        .join(', ')
        .trim();
    if (assignments.length > 0) {
        const sql = `UPDATE \`vacation\` SET ${assignments} WHERE \`id\` = :vacationId`;
        const conn = await getSqlConnection();
        try {
            conn.execute({ sql, namedPlaceholders: true }, { vacationId, ...body });
        } finally {
            conn.release();
        }
        return res.json(await getVacation(userId, vacationId));
    }
    else {
        return next();
    }
});

module.exports = router;

