const mysql = require('mysql2/promise');

async function getAllVacations() {
    const conn = await mysql.createConnection({
        user: 'root',
        database: 'vacations',
    });
    try {
        const [vacations] = await conn.execute(
            'SELECT `vacation`.*, COUNT(`user_id`) AS `followers` ' +
            'FROM `user_vacation` ' +
            'RIGHT JOIN `vacation` ON `vacation_id` = `vacation`.`id` ' +
            'GROUP BY `vacation`.`id`'
        );
        return vacations;
    }
    finally {
        await conn.end();
    }
}

Object.assign(exports, { getAllVacations });

