/* eslint-disable dot-notation */
const mysql = require('mysql2');

const getSqlConnection = (function () {
    let pool = null;
    return async function () {
        if (!pool) {
            pool = mysql.createPool({
                user: process.env['USER'],
                password: process.env['PASS'],
                database: 'vacations',
            });
        }
        return await pool.promise().getConnection();
    };
}());

exports.getSqlConnection = getSqlConnection;
