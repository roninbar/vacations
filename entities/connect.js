/* eslint-disable dot-notation */
const mysql = require('mysql2');

const getSqlConnection = (function () {
    let pool = null;
    return async function () {
        if (!pool) {
            pool = mysql.createPool({
                user: process.env['DBUSER'],
                password: process.env['DBPASS'],
                database: process.env['DBNAME'],
            });
        }
        return await pool.promise().getConnection();
    };
}());

exports.getSqlConnection = getSqlConnection;