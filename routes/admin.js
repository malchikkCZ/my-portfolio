if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');


// initialize passport module
const initializePassport = require('./utils/passport-config');
const { append } = require('express/lib/response');
initializePassport(
    passport,
    email => Users.find(user => user.email === email),
    id => Users.find(user => user.id === id)
);


// initialize router
const router = express.Router();
router.use(flash());
router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
router.use(passport.initialize());
router.use(passport.session());


const layout = 'layouts/admin';
const Users = [{
    id: '1647201789268',
    email: 'test@test.cz',
    password: '$2b$10$gQH1QCDdJTkTbn6uToywnuPocVhnFVSMZyBZiykKWlJvif2EMRYLO'
}];


// admin index route
router.get('/', checkSignIn, (req, res) => {
    res.render('admin/index', { layout: layout });
});


// admin main routes
router.get('/skills', checkSignIn, (req, res) => {
    res.render('admin/skills', { layout: layout });
})

router.get('/projects', checkSignIn, (req, res) => {
    res.render('admin/projects', { layout: layout });
})

router.get('/jobs', checkSignIn, (req, res) => {
    res.render('admin/jobs', { layout: layout });
})


// login routes
router.get('/login', checkSignOut, (req, res) => {
    res.render('admin/login', { layout: layout });
});

router.post('/login', checkSignOut, passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/admin/login',
    failureFlash: true
}));


// register routes
router.get('/register', checkSignOut, (req, res) => {
    res.render('admin/register', { layout: layout });
});

router.post('/register', checkSignOut, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        Users.push({
            id: Date.now().toString(),
            email: req.body.email,
            password: hashedPassword
        });
        res.redirect('/admin/login');
    } catch {
        res.redirect('/admin/register');
    }
    console.log(Users);
});


// logout route
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/admin');
});


// helper functions
function checkSignIn(req, res, next) {
    if (req.checkSignIn()) {
        return next();
    }
    res.redirect('/admin/login');
}

function checkSignOut(req, res, next) {
    if (req.checkSignIn()) {
        return res.redirect('/admin');
    }
    next();
}


// export router
module.exports = router;