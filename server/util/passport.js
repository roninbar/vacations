var passport = require('passport');
var { Strategy } = require('passport-local');
const { getUserByCredentials } = require("./data/user/retrieve");

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

passport.deserializeUser(function (id, done) {
    done(null, id);
});

module.exports = passport;

