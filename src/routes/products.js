const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (!req.session.user) {
        res.redirect('/auth/login');
    } else {
        const { username, role } = req.session.user;
        res.render('products', { username, role });
    }
});

module.exports = router;
