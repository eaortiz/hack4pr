var express = require('express');
var mongo = require('mongodb');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET /independent/dependent */
router.get('/:independent/:dependent', function(req, res) {
	file = req.params['independent'] + '-view.jade';

	console.log(file);
	res.render(file, {dependent: req.params['dependent']});
});

module.exports = router;
