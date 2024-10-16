const passport = require('passport');
const { Users } = require('../../../models');
const GitHubStrategy = require('passport-github2').Strategy;
const { generateRefreshToken } = require('../../../tokens/jwt');

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_ORIGIN}/auth/github/callback`,
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        let user = await Users.findOne({
          where: { authId: profile.id, provider: 'github' },
        });

        if (!user) {
          const profileData = {
            authId: profile.id,
            email: profile.id,
            name: profile.displayName,
            profileImg: profile.photos[0].value,
            provider: 'github'
          };

          if (!profileData.email) {
            return done(null, false, {
              message: '이메일이 존재하지 않음',
            });
          }

          const newRefreshToken = generateRefreshToken(profile.id);
          user = await Users.create({
            ...profileData,
            refreshToken: newRefreshToken,
          });
        } else {
          const newRefreshToken = generateRefreshToken(profile.id);
          await user.update({ refreshToken: newRefreshToken });
        }

        return done(null, user);
      } catch (error) {
        console.log(error);
        return done(error, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Users.findByPk(id)
    .then(user => {
      done(null, user);
    })
    .catch(error => done(error));
});
