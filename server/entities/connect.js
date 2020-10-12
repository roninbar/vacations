/* eslint-disable dot-notation */
const mysql = require('mysql2/promise');
const debug = require('debug')('server:mysql');

const getSqlConnection = (function () {
    let pool = null;
    return async function () {
        if (!pool) {
            debug(`Connecting to MySQL server at ${process.env['DBHOST'] || 'localhost'}:${process.env['DBPORT'] || '3306'}...`);
            pool = mysql.createPool({
                host: process.env['DBHOST'],
                port: process.env['DBPORT'],
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

