const express = require('express');
const router = express.Router();
const User = require('../src/config.js');
const bcrypt = require('bcrypt');
const {requireLogin,parseFirstName} = require('../src/utils.js');
const session = require('express-session');
const flash = require('connect-flash');

router.use(session({
    secret: 'yourSecretKey', 
    resave: false,
    saveUninitialized: false
}));

router.use(flash());

router.use((req, res, next) => {
    res.locals.invalidAuth = req.flash('invalidAuth');
    next();
});

router.get('/', (req, res) => {
    let loggedIn = false;
    let userId = req.session.userId;
    if(userId){
        loggedIn = true;
    }
    res.render('home',{loggedIn, userId});
});


router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { uname, pass } = req.body;    
    const userId = await User.evaluateAndAuthenticate(uname,pass);
    if (userId != null) {
        req.session.userId = userId;
        res.redirect('/');
    } else {
        req.flash('invalidAuth', 'Invalid Email or Password');
        res.redirect('/login');
    }
});

router.get('/register', (req, res) => {
    res.render('login');
});

router.post('/register', async (req, res) => {
    const { password,username,email, ...otherDetails } = req.body;
    console.log(req.body);
    let userId = await User.createAndRegister(password,username,email, otherDetails);
    req.session.userId = userId;
    res.redirect('/');
});

router.get('/users/:id', requireLogin, async (req, res, next) => {
    const { id } = req.params;
    const foundUser = await User.findOne({ _id : id });   
    const firstName = parseFirstName(foundUser.Name);
    res.render('userprofile', {foundUser,firstName});
});
router.get('/logout', (req, res) => {
    let loggedIn = false;
    let userId = req.session.userId;
    if(userId){
        loggedIn = true;
    }
    res.render('home',{loggedIn, userId});
});
module.exports = router;
