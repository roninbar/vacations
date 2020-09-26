const mysql = require('mysql2/promise');

async function getSqlConnection() {
    return await mysql.createConnection({
        user: 'root',
        database: 'vacations',
    });
}

exports.getSqlConnection = getSqlConnection;
