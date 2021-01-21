const { getSqlConnection } = require('../connect');

async function deleteVacation(id) {
    const conn = await getSqlConnection();
    const [{ affectedRows }] = await conn.execute('DELETE FROM `vacation` WHERE `id` = ?', [id]);
    return affectedRows;
}
exports.deleteVacation = deleteVacation;

