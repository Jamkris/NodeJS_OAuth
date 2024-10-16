const passport = require('passport');

const Login = passport.authenticate('github', { scope: ['email', 'profile'] });

module.exports = Login;
