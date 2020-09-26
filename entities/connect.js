const mysql = require('mysql2');

const getSqlConnection = (function () {
    let pool = null;
    return function () {
        if (!pool) {
            pool = mysql.createPool({
                user: process.env['USER'],
                password: process.env['PASS'],
                database: 'vacations',
            });
        }
        const conn = Object.create(pool.promise());
        conn.end = Function.prototype; // no-op
        return conn;
    };
})();

exports.getSqlConnection = getSqlConnection;
