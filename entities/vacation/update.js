const _ = require('lodash');
const { getSqlConnection } = require('../connect');

async function followVacation(userId, vacationId) {
    const conn = await getSqlConnection();
    const [{ insertId }] = await conn.execute('INSERT IGNORE INTO `user_vacation` (`user_id`, `vacation_id`) VALUES (?, ?)', [
        userId,
        vacationId
    ]);
    return insertId;
}

async function unfollowVacation(userId, vacationId) {
    const conn = await getSqlConnection();
    const [{ affectedRows }] = await conn.execute('DELETE FROM `user_vacation` WHERE `user_id` = ? AND `vacation_id` = ?', [
        userId,
        vacationId
    ]);
    return affectedRows;
}

/**
 * Update a vacation.
 * @param {number} id Vacation ID
 * @param {object} newValues An object containing new values for one or more columns.
 */
async function updateVacation(id, newValues) {
    if (!_.isEmpty(newValues)) {
        const assignments = Object.keys(newValues)
            .filter(key => typeof newValues[key] === 'string')
            .map(col => `\`${col}\` = :${col}`)
            .join(', ')
            .trim();
        const sql = `UPDATE \`vacation\` SET ${assignments} WHERE \`id\` = :id`;
        const conn = await getSqlConnection();
        const [{ affectedRows }] = await conn.execute({ sql, namedPlaceholders: true }, { id, ...newValues });
        return affectedRows;
    }
    else {
        return 0;
    }
}

Object.assign(exports, { followVacation, unfollowVacation, updateVacation });

