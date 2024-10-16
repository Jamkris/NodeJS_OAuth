const express = require('express');
const passport = require('passport');
const router = express.Router();
const session = require('express-session');
const {
	generateAccessToken,
	generateRefreshToken,
} = require('../../../tokens/jwt');
const { validateToken } = require('../../../middlewares/AuthMiddleware.js');

router.use(session({ secret: process.env.SESSEION_SECRET }));
router.use(passport.initialize());
router.use(passport.session());
router.use(express.json());
require('./auth');

const Login = require('./Login.js');
router.get('/github', Login);

const Callback = require('./Callback.js');
router.get('/github/callback', Callback, async (req, res) => {
	try {
		const accessToken = generateAccessToken(req.user.dataValues.email);
		const refreshToken = req.user.refreshToken;

		res.redirect(`${process.env.CLIENT_ORIGIN}/auth/github/callback?accessToken=${accessToken}&refreshToken=${refreshToken}`);
	} catch (error) {
		console.error('Error during callback processing:', error);
		res.redirect(`${process.env.CLIENT_ORIGIN}/login`);
	}
});

const Fail = require('./Fail.js');
router.get('/github/failure', Fail);

const AuthState = require('./AuthState.js');
router.get('/github/authstate', validateToken, AuthState);

const Logout = require('./Logout.js');
router.delete('/github/logout', validateToken, Logout);

const Refresh = require('./Refresh.js');
router.post('/github/token', Refresh);

module.exports = router;
