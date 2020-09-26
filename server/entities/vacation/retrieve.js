const mysql = require('mysql2/promise');
const { getSqlConnection } = require('../connect');

const SELECT_VACATIONS =
    'SELECT `vacation`.*, ' +
    'COUNT(`user_id`) AS `followers`, ' +
    'IFNULL(MAX(`user_id` = :userId), 0) AS `isFollowing` ' +
    'FROM `user_vacation` ' +
    'RIGHT JOIN `vacation` ON `vacation_id` = `vacation`.`id` ' +
    'GROUP BY `vacation`.`id`';

async function getVacation(userId, vacationId) {
    const conn = await getSqlConnection();
    try {
        const [[vacation]] = await conn.execute({
            sql: SELECT_VACATIONS + ' HAVING `vacation`.`id` = :vacationId',
            namedPlaceholders: true,
        }, {
            userId,
            vacationId,
        });
        return vacation;
    }
    finally {
        await conn.end();
    }
}

async function getAllVacations(userId) {
    const conn = await getSqlConnection();
    try {
        const [vacations] = await conn.execute({
            sql: SELECT_VACATIONS,
            namedPlaceholders: true,
        }, {
            userId,
        });
        return vacations;
    }
    finally {
        await conn.end();
    }
}

Object.assign(exports, { getVacation, getAllVacations });

