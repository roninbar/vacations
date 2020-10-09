/* eslint-disable dot-notation */
const mysql = require('mysql2/promise');

const getSqlConnection = (function () {
    let pool = null;
    return async function () {
        if (!pool) {
            pool = mysql.createPool({
                user: process.env['DBUSER'],
                password: process.env['DBPASS'],
                database: process.env['DBNAME'],
                dateStrings: [
                    'DATE',
                    'DATETIME',
                ],
            });
        }
        return await pool.getConnection();
    };
}());

exports.getSqlConnection = getSqlConnection;

