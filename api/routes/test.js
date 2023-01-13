var express = require('express');
var router = express.Router();

/* Send simple list of data */
router.get('/users', (req, res, next) => {
    res.json({ 'users': ['user1', 'user2', 'user3'] })
})

/* Barebones authentication for single user */
router.get('/login', (req, res, next) => {
    res.json({ 'valid': (req.body.name == 'Code') })
})

module.exports = router;
