const { response } = require('express');
var express = require('express');
const { user } = require('../models');
var router = express.Router();
var controller = require("../controllers/user.controller");
const { authJwt } = require("../middleware");


router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

/* GET users listing. */
router.get('/read', [authJwt.verifyToken], controller.read);
router.get('/readid', [authJwt.verifyToken], controller.readid);
router.put('/update', [authJwt.verifyToken], controller.update);
router.put('/updaterank', [authJwt.verifyToken], controller.update_rank);
router.delete('/delete', [authJwt.verifyToken, authJwt.isModeratorOrAdmin], controller.delete);
router.get('/rankings', [], controller.get_rankings);

module.exports = router;
