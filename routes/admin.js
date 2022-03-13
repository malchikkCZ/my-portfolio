const express = require('express');
const session = require('express-session');


// initialize router
const router = express.Router();
router.use(session({
    secret: 'gudjhguisahgsiaugh',
    resave: true,
    saveUninitialized: true
}));


const layout = 'layouts/admin';
const Users = [
    {
        email: "test@test.com",
        password: "password"
    }
];


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
router.get('/login', (req, res) => {
    res.render('admin/login', { layout: layout });
});

router.post('/login', (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.render('admin/login', {
            layout: layout,
            errorMessage: 'Please enter your email and password.'
        });
    } else {
        if (isUserAuthenticated(req, res)) {
            res.redirect('/admin');
        } else {
            res.render('admin/login', {
                layout: layout,
                errorMessage: 'Invalid email or password.'
            });
        }
    }
});


// logout route
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/admin');
});


// helper functions
function checkSignIn(req, res, next) {
    if (!req.session.user) {
        res.redirect('/admin/login');
    } else {
        next();
    }
}

function isUserAuthenticated(req, res) {
    let isAuthenticated = false;
    Users.filter((user) => {
        if (user.email === req.body.email && user.password == req.body.password) {
            req.session.user = user;
            isAuthenticated = true;
        }
    });
    return isAuthenticated;
}


// export router
module.exports = router;