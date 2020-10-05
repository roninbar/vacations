/* eslint-disable max-params */
const { hash } = require('../../util/hash');
const { getSqlConnection } = require('../connect');

async function addUser(username, password, firstname, lastname) {
  const conn = await getSqlConnection();
  try {
    const [{ insertId }] = await conn.execute({
      sql: `INSERT INTO \`user\` SET 
        \`name\` = :username, 
        \`password_hash\` = :passwordHash, 
        \`first_name\` = :firstname, 
        \`last_name\` = :lastname`,
      namedPlaceholders: true,
    }, {
      firstname,
      lastname,
      username,
      passwordHash: hash(password),
    });
    return insertId;
  }
  finally {
    await conn.release();
  }
}

exports.addUser = addUser;

