// passport
const passport = require('passport');
// We're going to need the User model
const Band = require('../models/bands');
// And we're going to need the Local Strategy for this kind of registration
const LocalStrategy = require('passport-local').Strategy;
// We'll also need bcrypt to authenticate uses without storing their
// passoword _anywhere_...
const bcrypt = require('bcryptjs');

const passportInstance = passport.initialize();
const passportSession = passport.session();

function restrict(req, res, next) {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/bands/login');
    }
}

// Given user information called "user", what do we want to serialize
// to the session?
passport.serializeUser((band, done) => {
    done(null, band);
});

// Given an object representing our user (obtained from the session),
// how shall we define any other user information we'll need in our
// routes, conveniently accessible as req.user in routes?

passport.deserializeUser((bandObj, done) => {
    Band
        .findByName(bandObj.name)
        .then(band => {
            done(null, band);
        })
        .catch(err => {
            console.log('ERROR in deserializeUser:', err);
            done(null, false);
        });
});

// see router.post('/', ...) in controllers/users
passport.use(
    'local-signup',
    new LocalStrategy({
            // these are the names of the fields for email and password in
            // the login form we'll be serving (see the view)
            usernameField: 'band[name]',
            passwordField: 'band[password]',
            passReqToCallback: true
        },
        (req, name, password, done) => {
            Band
                .create(req.body.band)
                .then((band) => {
                    return done(null, band);
                })
                .catch((err) => {
                    console.log('ERROR:', err);
                    return done(null, false);
                });
        })
);

passport.use(
    'local-login',
    new LocalStrategy({
            usernameField: 'band[name]',
            passwordField: 'band[password]',
            passReqToCallback: true
        },
        (req, name, password, done) => {
            Band
                .findByName(name)
                .then((band) => {
                    if (band) {
                        // here we use bcrypt to figure out whether the user is logged in or not
                        const isAuthed = bcrypt.compareSync(password, band.password_digest);
                        console.log('is Authed:');
                        console.log(isAuthed)
                        if (isAuthed) {
                            return done(null, band);
                        } else {
                            return done(null, false);
                        }
                    } else {
                        return done(null, false);
                    }
                });
        })
);

// export this stuff, hook up in the top index.js
module.exports = { passportInstance, passportSession, restrict };
