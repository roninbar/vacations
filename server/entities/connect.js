/* eslint-disable dot-notation */
const mysql = require('mysql2/promise');
const debug = require('debug')('server:mysql');

let pool = null;

async function getSqlConnection() {
    if (!pool) {
        debug(`Connecting to \`${process.env['DBNAME']}\` at ${process.env['DBHOST'] || '(localhost)'}:${process.env['DBPORT'] || '(3306)'}...`);
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
}

exports.getSqlConnection = getSqlConnection;

