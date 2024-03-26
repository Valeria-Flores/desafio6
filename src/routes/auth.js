const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password }).exec();

    if (!user) {
        res.send('Credenciales incorrectas');
    } else {
        req.session.user = user;
        res.redirect('/products');
    }
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    const user = new User({ username, password, role });
    await user.save();
    res.redirect('/auth/login');
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
});

module.exports = router;
