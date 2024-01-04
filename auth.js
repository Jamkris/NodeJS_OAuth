const passport = require('passport');
const Users = require('./models/Users');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: 'http://localhost:3000/auth/google/callback',
			passReqToCallback: true,
		},
		function (request, accessToken, refreshToken, profile, done) {
			// console.log(profile);
			// return done(null, profile);

			Users.findOrCreate(
				{
					where: {
						googleId: profile.id,
						email: profile.email,
						name: profile.displayName,
						profileImg: profile.picture,
					},
				},
				function (err, user) {
					if (err) {
						return done(err);
					}
					done(null, user);
				}
			)
				.spread((user, created) => {
					done(null, user);
				})
				.catch((err) => {
					return done(new Error('Internal Server Error'));
				});
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
