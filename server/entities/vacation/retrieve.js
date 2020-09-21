const mysql = require('mysql2/promise');

async function getAllVacations(userId) {
    const conn = await mysql.createConnection({
        user: 'root',
        database: 'vacations',
    });
    try {
        const [vacations] = await conn.execute(
            'SELECT `vacation`.*, ' +
            'COUNT(`user_id`) AS `followers`, ' +
            'IFNULL(MAX(`user_id` = ?), 0) AS `isFollowing` ' +
            'FROM `user_vacation` ' +
            'RIGHT JOIN `vacation` ON `vacation_id` = `vacation`.`id` ' +
            'GROUP BY `vacation`.`id`',
            [userId],
        );
        return vacations;
    }
    finally {
        await conn.end();
    }
}

Object.assign(exports, { getAllVacations });

