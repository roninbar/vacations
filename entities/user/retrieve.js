const { hash } = require('../../util/hash');
const { getSqlConnection } = require('../connect');

async function getUserByName(name) {
    const conn = await getSqlConnection();
    const [[user]] = await conn.execute('SELECT * FROM `user` WHERE `name` = ?', [name]);
    return user;
}

async function getUserByCredentials(username, password) {
    const conn = await getSqlConnection();
    const [[user]] = await conn.execute(
        'SELECT `user`.`id` AS `id`, `user`.`name` as `name`, `user`.`first_name` as `firstName`, `user`.`last_name` as `lastName`, `role`.`name` AS `role` ' +
        'FROM `user` JOIN `role` ON `role_id` = `role`.`id` ' +
        'WHERE `user`.`name` = ? AND `password_hash` = ?',
        [
            username,
            hash(password),
        ]);
    return user;
}

Object.assign(exports, { getUserByName, getUserByCredentials });

