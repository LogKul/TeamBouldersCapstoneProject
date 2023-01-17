const { response } = require('express');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/all', function (req, res, next) {
  var db = req.app.locals.db;
  db.query('SELECT * FROM public.users ORDER BY username ASC', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
})

module.exports = router;
