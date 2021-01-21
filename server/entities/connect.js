/* eslint-disable dot-notation */
const mysql = require('mysql2/promise');
const debug = require('debug');

const log = debug('server:mysql');

const host = process.env['DBHOST'];
const port = process.env['DBPORT'];
const user = process.env['DBUSER'];
const password = process.env['DBPASS'];
const database = process.env['DBNAME'];

let pool = null;

async function getSqlConnection() {
    if (!pool) {
        log(`Connecting to \`${database}\` at ${host || '(localhost)'}:${port || '(3306)'}...`);
        pool = mysql.createPool({
            host, port, user, password, database, dateStrings: [
                'DATE',
                'DATETIME',
            ],
        });
    }
    return await pool.getConnection();
}

exports.getSqlConnection = getSqlConnection;

