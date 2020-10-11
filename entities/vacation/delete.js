const { getSqlConnection } = require('../connect');

async function deleteVacation(id) {
    const conn = await getSqlConnection();
    try {
        const [{ affectedRows }] = await conn.execute('DELETE FROM `vacation` WHERE `id` = ?', [id]);
        return affectedRows;
    }
    finally {
        await conn.release();
    }
}
exports.deleteVacation = deleteVacation;

