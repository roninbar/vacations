/* eslint-disable dot-notation */
const mysql = require('mysql2/promise');
const debug = require('debug');

const log = debug('server:mysql');

function getSqlConnectionParams() {
    const DBURL_REGEX = /^mysql:\/\/(?:(?<user>\w+)(?::(?<password>\w+))?@)?(?<host>[\w.-]+)(?::(?<port>\d{4,5}))?(?:\/(?<database>\w+))?$/;

    const dburl = process.env['JAWSDB_MARIA_URL'] || 'mysql://localhost/vacations';

    const {
        groups: {
            host,
            port,
            user,
            password,
            database,
        },
    } = dburl.match(DBURL_REGEX) || { groups: {} };

    log(`Connecting to \`${database}\` at ${host || '(localhost)'}${port ? `:${port}` : '(:3306)'}...`);

    return {
        host: host || 'localhost',
        port: port || '3306',
        user: user || 'root',
        password: password || '',
        database: database || 'vacations',
        dateStrings: [
            'DATE',
            'DATETIME',
        ],
    };
}

let pool = null;

function getSqlConnection() {
    if (!pool) {
        pool = mysql.createPool(getSqlConnectionParams());
    }
    return pool;
}

module.exports = { getSqlConnectionParams, getSqlConnection };
