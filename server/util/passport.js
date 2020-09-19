var passport = require('passport');
var { Strategy } = require('passport-local');
var mysql = require('mysql2/promise');
const { hash } = require('./hash');

passport.use(new Strategy(async function (username, password, done) {
    const conn = await mysql.createConnection({
        user: 'root',
        database: 'vacations',
    });
    try {
        const [[user]] = await conn.execute(
            'SELECT `user`.`id` AS `id`, `user`.`name` as `name`, `role`.`name` AS `role` ' +
            'FROM `user` JOIN `role` ON `role_id` = `role`.`id` ' +
            'WHERE `user`.`name` = ? AND `password_hash` = ?',
            [username, hash(password)]);
        return done(null, user, { message: user ? 'Greetings, Professor Falken!' : 'Invalid username/password.' });
    }
    catch (error) {
        return done(error);
    }
    finally {
        await conn.end();
    }
}));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (id, done) {
    done(null, id);
});

module.exports = passport;
