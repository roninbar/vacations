const passport = require('passport');
const { Strategy } = require('passport-local');
const { getUserByCredentials } = require('../entities/user/retrieve');

passport.use(new Strategy(async function (username, password, done) {
    try {
        return done(null, await getUserByCredentials(username, password));
    }
    catch (error) {
        return done(error);
    }
}));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

module.exports = passport;

