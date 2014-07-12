console.log("asdf");
var a = new google.maps.LatLng(lat=37.788230, lng=-60.450646);
var b = new google.maps.LatLng(lat=38.788230, lng=-60.450646);
console.log(a, b);
var c = google.maps.geometry.spherical.computeDistanceBetween(a, b);
console.log(c);

