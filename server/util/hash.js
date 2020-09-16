var crypto = require('crypto');

function hash(password) {
  return crypto.createHmac('sha256', 'xyzzy').update(password).digest('base64');
}

exports.hash = hash;
