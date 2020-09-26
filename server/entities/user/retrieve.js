const mysql = require('mysql2/promise');
const { hash } = require('../../util/hash');
const { getSqlConnection } = require('../connect');

async function getUserByName(name) {
    const conn = await getSqlConnection();
    try {
        const [[user]] = await conn.execute('SELECT * FROM `user` WHERE `name` = ?', [name]);
        return user;
    }
    finally {
        await conn.end();
    }
}

async function getUserByCredentials(username, password) {
    const conn = await getSqlConnection();
    try {
        const [[user]] = await conn.execute(
            'SELECT `user`.`id` AS `id`, `user`.`name` as `name`, `role`.`name` AS `role` ' +
            'FROM `user` JOIN `role` ON `role_id` = `role`.`id` ' +
            'WHERE `user`.`name` = ? AND `password_hash` = ?',
            [username, hash(password)]);
        return user;
    }
    finally {
        await conn.end();
    }
}

Object.assign(exports, { getUserByName, getUserByCredentials });

