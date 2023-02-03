const { response } = require('express');
var express = require('express');
const { game } = require('../models');
var router = express.Router();
var controller = require("../controllers/game.controller");
const { authJwt } = require("../middleware");


router.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

/* Game CRUD */
router.post('/create', [authJwt.verifyToken], controller.create);
router.get('/read', [authJwt.verifyToken], controller.read);
router.put('/update', [authJwt.verifyToken], controller.update);
router.delete('/delete', [authJwt.verifyToken, authJwt.isModeratorOrAdmin], controller.delete);

module.exports = router;
