const express = require('express');
const passport = require('passport');
const router = express.Router();
const session = require('express-session');

router.use(session({ secret: 'cats' }));
router.use(passport.initialize());
router.use(passport.session());
router.use(express.json());

require('../auth');

function isLoggedIn(req, res, next) {
	if (req.user) {
		next();
	} else {
		res.sendStatus(401);
	}
}

router.get(
	'/google',
	passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(
	'/google/callback',
	passport.authenticate('google', {
		successRedirect: '/auth/protected',
		failureRedirect: '/auth/failure',
	})
);

router.get('/failure', (req, res) => {
	res.send('User Failure');
});

router.get('/protected', isLoggedIn, (req, res) => {
	res.send(
		`Hello UserName: ${req.user.displayName} email:  ${req.user.email}`
	);
});

router.get('/google/logout', (req, res, next) => {
	req.logOut((err) => {
		if (err) {
			return next(err);
		} else {
			console.log('로그아웃됨.');
			res.redirect('/');
		}
	});
});

module.exports = router;
