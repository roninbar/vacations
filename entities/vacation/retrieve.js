const mysql = require('mysql2/promise');

async function getAllVacations() {
    const conn = await mysql.createConnection({
        user: 'root',
        database: 'vacations',
    });
    try {
        const [vacations] = await conn.execute('SELECT * FROM `vacation`');
        return vacations;
    }
    finally {
        await conn.end();
    }
}

Object.assign(exports, { getAllVacations });

