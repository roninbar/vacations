const { getSqlConnection } = require('../../entities/connect');
const { getAllVacations } = require('../../entities/vacation/retrieve');
const express = require('express');
const router = express.Router();

// Delete vacation.
router.delete('/:id', async function ({ params: { id: vacationId }, user: { id: userId } }, res) {
    const conn = await getSqlConnection();
    try {
        conn.execute('delete from vacation where id = ?', [vacationId]);
    }
    finally {
        conn.release();
    }
    res.json(await getAllVacations(userId));
});

module.exports = router;

