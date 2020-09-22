const mysql = require('mysql2/promise');

async function followVacation(userId, vacationId) {
    const conn = await mysql.createConnection({
        user: 'root',
        database: 'vacations',
    });
    try {
        const [{insertId}] = await conn.execute('INSERT IGNORE INTO `user_vacation` (`user_id`, `vacation_id`) VALUES (?, ?)', [userId, vacationId]);
        return insertId;
    }
    finally {
        await conn.end();
    }
}

async function unfollowVacation(userId, vacationId) {
    const conn = await mysql.createConnection({
        user: 'root',
        database: 'vacations',
    });
    try {
        const [{ affectedRows }] = await conn.execute('DELETE FROM `user_vacation` WHERE `user_id` = ? AND `vacation_id` = ?', [userId, vacationId]);
        return affectedRows;
    }
    finally {
        await conn.end();
    }
}

Object.assign(exports, { followVacation, unfollowVacation });
