var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* TEST endpoint */
router.get('/api', (req, res, next) => {
  res.json({ 'users': ['user1', 'user2', 'user3'] })
})

module.exports = router;
