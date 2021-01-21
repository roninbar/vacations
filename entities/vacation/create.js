const { getSqlConnection } = require('../connect');

async function addVacation(vacation) {
    const conn = await getSqlConnection();
    // eslint-disable-next-line newline-per-chained-call
    const assignments = Object.keys(vacation).map(col => `\`${col}\` = :${col}`).join(', ');
    const sql = `INSERT INTO \`vacation\` SET ${assignments}`;
    const [{ insertId }] = await conn.execute({ sql, namedPlaceholders: true }, vacation);
    return insertId;
}
exports.addVacation = addVacation;

