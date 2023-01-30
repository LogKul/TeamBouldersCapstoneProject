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
router.get('/all', [authJwt.verifyToken], controller.userAccess);
router.get('/read', [authJwt.verifyToken], controller.read);
router.put('/update', [authJwt.verifyToken], controller.update);
router.delete('/delete', [authJwt.verifyToken, authJwt.isModeratorOrAdmin], controller.delete);


/* PRE-ORM
router.get('/all', function (req, res, next) {
  var db = req.app.locals.db;
  db.query('SELECT * FROM public.users ORDER BY username ASC', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
})
*/
module.exports = router;
