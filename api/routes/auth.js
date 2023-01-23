var express = require('express');
var router = express.Router();
var controller = require("../controllers/auth.controller");
var { validateSignUp } = require("../middleware");

router.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

/* Send simple list of data */
router.get('/users', (req, res, next) => {
    res.json({ 'users': ['user1', 'user2', 'user3'] })
})

/* Login */
router.get('/login/:username&:password', controller.login)

/* Signup */
router.post('/signup', [validateSignUp.validateNoDuplicateUsername], controller.signup)

module.exports = router;