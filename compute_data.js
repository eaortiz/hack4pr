var geolib = require("geolib");
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var fs = require('fs');
var file = __dirname + '/admitted_students.json';
 
fs.readFile(file, 'utf8', function (err, data) {
	if (err) {
		console.log('Error: ' + err);
		return;
	}

	data = JSON.parse(data);

	var MAX_DISTANCE = 105 //miles (taken from a^2 + b^2 = c^2 with a,b = 100,35)
	var NUM_BUCKETS = 4.0
	var L = MAX_DISTANCE / NUM_BUCKETS; //bucket length
	L = L * 1600; //get distance in meters

	var buckets = {"home":[], "close":[], "mid":[], "far":[]}
	var distance_ranges = {"home":[0, L], "close":[L, 2*L], "mid":[2*L, 3*L], "far":[3*L, 4*L]}
	// console.log(distance_ranges);

	for (i in data) {
		var student = data[i];
		put_student_in_bucket(student, buckets, distance_ranges);
		// major, igs, gpa
	}

	for (b in buckets) {
		var avg_gpa = compute_avg_gpa(buckets[b]);
		console.log(b, buckets[b].length);
		console.log(avg_gpa);
	}
});


var put_student_in_bucket = function(student, buckets, ranges) {
	var home = student["home"];
	var campus = student["campus"];
	var a = home["latitude"];
	var b = home["longitude"];
	var c = campus["latitude"];
	var d = campus["longitude"];

	var distance = geolib.getDistance({latitude: a, longitude: b}, 
		{latitude: c, longitude: d});
	// console.log(distance);
	
	var inserted = false;
	for (b in ranges) {
		var range = ranges[b];
		if (range[0] <= distance && distance <= range[1]) {
			buckets[b].push(student);
			// console.log(b);
			inserted = true;
			break;
		}
	}
	if (!inserted) {
		buckets["far"].push(student);
	}
}
var compute_avg_gpa = function(students) {
	var total = 0.0;
	var n = parseFloat(students.length);

	for (i in students) {
		var s = students[i];
		var gpa = parseFloat(s["gpa"]);
		if (isNaN(gpa)) {
			n -= 1;
			continue;
		}
		total += gpa;
	}
	return total / n;
}
// MongoClient.connect('mongodb://127.0.0.1:27017/unidb', function(err, db) {
// 	var collection = db.collection('unidata');
// });




// var a = geolib.getDistance(
//     {latitude: 51.5103, longitude: 7.49347}, 
//     {latitude: "51° 31' N", longitude: "7° 28' E"}
// );
// console.log(a);