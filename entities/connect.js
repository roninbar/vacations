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
        const conn = Object.create(await pool.promise().getConnection());
        conn.end = function() {
            pool.releaseConnection(this.connection);
        };
        return conn;
    };
})();

exports.getSqlConnection = getSqlConnection;
