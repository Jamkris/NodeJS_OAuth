const passport = require('passport');

const Callback = passport.authenticate('github', {
  failureRedirect: '/auth/github/failure',
  session: true,
});

module.exports = Callback;
