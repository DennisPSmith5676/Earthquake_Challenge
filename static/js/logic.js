// Add console.log to check to see if our code is working.
console.log("It's working");

// Create the map object with a center and zoom level.
let map = L.map("mapid").setView([40.7, -94.5], 4);

// Create the map object with a center and zoom level.
// let map = L.map("mapid", {
// 	center: [
// 	  40.7, -94.5
// 	],
// 	zoom: 4
//       });

// tile layer
// We create the tile layer that will be the background of our map.
let streets = L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY,
  }
);

let satelliteStreets = L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/satellite-streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY,
  }
);

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

//  Add a marker to the map for Los Angeles, California.
// https://leafletjs.com/SlavaUkraini/reference.html#circlemarker
let marker = L.circleMarker([34.0522, -118.2437]).addTo(map);

// Add GeoJSON data.
let sanFranAirport = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        id: "3469",
        name: "San Francisco International Airport",
        city: "San Francisco",
        country: "United States",
        faa: "SFO",
        icao: "KSFO",
        alt: "13",
        "tz-offset": "-8",
        dst: "A",
        tz: "America/Los_Angeles",
      },
      geometry: {
        type: "Point",
        coordinates: [-122.375, 37.61899948120117],
      },
    },
  ],
};

// point to layer funtion example
// L.geoJson(data, {
// 	pointToLayer: function(feature, latlng) {
// 	  return L.marker(latlng);
// 	 }
//     });

// Grabbing our GeoJSON data.
//  L.geoJSON(sanFranAirport, {
// 	 pointToLayer: function(feature, latlng){
// 		 return L.circleMarker(latlng)
// 		 .bindPopup("<h2>" + feature.properties.city + "</h2>");
// 	 }
//  }).addTo(map);
// 
L.geoJSON(sanFranAirport, {
	onEachFeature: function(feature, layer) {
	  layer.bindPopup("<h4>" + feature.properties.city + "</h4>"+"<hr>"+"<h6>faa code</h6>"+feature.properties.faa);
	 }
    }).addTo(map);

//     link to airport data
let airportData = "https://raw.githubusercontent.com/DennisPSmith5676/Earthquake_Challenge/Mapping_Earthquakes/main/static/data/majorAirports.json";

// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data).addTo(map);
});