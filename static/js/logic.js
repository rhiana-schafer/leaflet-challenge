//Using Leaflet, create a map that plots all the earthquakes 
//from your dataset based on their longitude and latitude.
var myMap = L.map("map", {
    center: [39, -98], //geographic center of the us
    zoom: 2
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

d3.json(url).then(function(data) {
    L.geoJSON(data, {onEachFeature: addPopups, pointToLayer: changeMarkers}).addTo(myMap);
});

function addPopups(feature, layer) {
    //Include popups that provide additional information about the earthquake when its associated marker is clicked.
    layer.bindPopup(feature.properties.title);
    
//Your data markers should reflect:
// the magnitude of the earthquake by their size, higher = larger
// the depth of the earthquake by color, deeper = darker.
//Hint: The depth of the earth can be found as the third coordinate for each earthquake.
};

function changeMarkers(feature, latlng) {
    let size = feature.properties.mag;
    let depth = feature.geometry.coordinates[2];
    var geojsonMarkerOptions = {
        radius: size*4,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.5
    };
    return L.circleMarker(latlng, geojsonMarkerOptions)
};

//Create a legend that will provide context for your map data.