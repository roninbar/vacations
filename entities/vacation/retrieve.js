const { getSqlConnection } = require('../connect');

const SELECT_VACATIONS =
    'SELECT `vacation`.*, ' +
    'COUNT(`user_id`) AS `followers`, ' +
    'IFNULL(MAX(`user_id` = :userId), 0) AS `isFollowing` ' +
    'FROM `user_vacation` ' +
    'RIGHT JOIN `vacation` ON `vacation_id` = `vacation`.`id` ' +
    'GROUP BY `vacation`.`id`';

/**
 * Get a single vacation.
 * @param {number} userId 
 * @param {number} vacationId 
 */
async function getVacation(userId, vacationId) {
    const conn = await getSqlConnection();
    const [[vacation]] = await conn.execute({
        // eslint-disable-next-line prefer-template
        sql: SELECT_VACATIONS + ' HAVING `vacation`.`id` = :vacationId',
        namedPlaceholders: true,
    }, {
        userId,
        vacationId,
    });
    return vacation;
}

/**
 * Get all the vacations
 * @param {number} userId 
 */
async function getAllVacations(userId) {
    const conn = await getSqlConnection();
    const [vacations] = await conn.execute({
        sql: SELECT_VACATIONS,
        namedPlaceholders: true,
    }, {
        userId,
    });
    return vacations;
}

Object.assign(exports, { getVacation, getAllVacations });

