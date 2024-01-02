const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');
dotenv.config();

const app = express();
app.use(session({ secret: 'cats' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

require('./auth');

//Port Setting
const PORT = process.env.PORT;

//API Test
app.get('/', (req, res) => {
	res.send(`
        <h1>OAuth</h1>
        <a href="/auth/google">LogIn</a>
        <a href="/logout">LogOut</a>
    `);
});

function isLoggedIn(req, res, next) {
	req.user ? next() : res.sendStatus(401);
}

app.get(
	'/auth/google',
	passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get(
	'/google/callback',
	passport.authenticate('google', {
		successRedirect: '/protected',
		failureRedirect: '/auth/failure',
	})
);

app.get('/auth/failure', (req, res) => {
	res.send('User Failure');
});

app.get('/protected', isLoggedIn, (req, res) => {
	res.send(`Hello User ${req.user.displayName}`);
});

app.get('/logout', (req, res) => {
	req.logout()
	req.session.destroy()
	res.send('ByeBye');
});

//Port
app.listen(PORT, () => console.log(`API running PORT ${PORT}`));
