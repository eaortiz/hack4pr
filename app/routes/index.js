var express = require('express');
var mongo = require('mongodb');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient, format = require('util').format;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET /independent/dependent */
router.get('/:independent/:dependent', function(req, res) {
	file = req.params['independent'] + '-view.jade';

	console.log(file);
	res.render(file, {dependent: req.params['dependent']});
	// transformDBDataIntoViewData(res, req);
});

var transformDBDataIntoViewData = function(res, req) {
  var file = req.params['independent'] + '-view.jade';
  var result = [0, 0, 0, 0];
  var students = new Array();

  MongoClient.connect('mongodb://127.0.0.1:27017/unidb', function(err, db) {
    if(err) throw err;
    var collection = db.collection('unidata');
    collection.find().toArray(function(err, results) {
    	for (index in results) {
    		student = results[index];
    		var gpa = student.gpa
    		var long_campus = student.campus.longitude; 
    		var lat_campus = student.campus.latitude;
    		data = gpa + " " + long_campus + " " + lat_campus;
	    	students.push(data);
	    }
        res.render(file, {dependent: req.params['dependent'], data: students});
        db.close();
    });
  })
  return students;
}

module.exports = router;
