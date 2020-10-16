const { addUser } = require('../../entities/user/create');
const { getUserByName } = require('../../entities/user/retrieve');
const passport = require('../../util/passport');
const express = require('express');

const router = express();

// Create a new user account.
router.post('/', async function (req, res) {
  const { username, password, firstName, lastName } = req.body;
  try {
    const id = await addUser(username, password, firstName, lastName);
    res.set('Location', `${router.mountpath}/${id}`).sendStatus(201);
  } catch (error) {
    res.sendStatus(error.code === 'ER_DUP_ENTRY' ? 409 /* Conflict */ : 500);
  }
});

// Check if the given username exists.
router.head('/:name', async function (req, res) {
  const { name } = req.params;
  res.sendStatus(await getUserByName(name) ? 200 : 404);
});

router.post('/login',
  passport.authenticate('local'),
  function (req, res) {
    res.json(req.user);
  }
);

router.post('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      res.sendStatus(400);
    }
    req.logout();
    res.clearCookie('connect.sid').sendStatus(205);
  });
});

module.exports = router;

