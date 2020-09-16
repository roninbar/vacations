const mysql = require('mysql2/promise');

async function getUserByName(name) {
  const conn = await mysql.createConnection({
    user: 'root',
    database: 'vacations',
  });
  try {
    const [[user]] = await conn.execute('SELECT * FROM `user` WHERE `name` = ?', [name]);
    return user;
  }
  finally {
    await conn.end();
  }
}

exports.getUserByName = getUserByName;
