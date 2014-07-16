var geolib = require("geolib");

var a = geolib.getDistance(
    {latitude: 51.5103, longitude: 7.49347}, 
    {latitude: "51° 31' N", longitude: "7° 28' E"}
);
console.log(a);
geolib.getDistance(
    {latitude: 51.5103, longitude: 7.49347}, 
    {latitude: "51° 31' N", longitude: "7° 28' E"}
);