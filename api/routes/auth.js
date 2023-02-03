var express = require('express');
var router = express.Router();
var controller = require("../controllers/auth.controller");
var { validateSignUp, authJwt, signInLimiter } = require("../middleware");

router.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

/* Login */
router.get('/login', [signInLimiter], controller.login)

/* Signup */
router.post('/signup', [validateSignUp.validateNoDuplicateUsername], controller.signup)

/* Refresh Token */
router.get('/refresh', [authJwt.verifyToken], controller.refresh)

module.exports = router;