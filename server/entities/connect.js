/* eslint-disable dot-notation */
const mysql = require('mysql2/promise');
const debug = require('debug');

const log = debug('server:mysql');

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

let pool = null;

function getSqlConnectionPool() {
    if (!pool) {
        log(`Connecting to \`${database}\` at ${host || '(localhost)'}${port ? `:${port}` : '(:3306)'}...`);
        pool = mysql.createPool({
            host: host || 'localhost',
            port: port || '3306',
            user: user || 'root',
            password: password || '',
            database: database || 'vacations',
            dateStrings: [
                'DATE',
                'DATETIME',
            ],
        });
    }
    return pool;
}

exports.getSqlConnection = getSqlConnectionPool;

