var map = L.map('mapid', {
  center: [39, -94.5],
  zoom: 10,
  minZoom:2,
  maxZoom:18
});

L.tileLayer('http://{s}.tiles.mapbox.com/v3/ianmule.bg2v5cdi/{z}/{x}/{y}.png', {
     attribution: "Mapbox"
}).addTo(map);

var marker = L.marker([39.5, -98.35]);
marker.addTo(map);

L.control.attribution ({
	positon: 'topright'
}).addTo(map).addAttribution("commuter population attributes");

var jsonstyle = {
	"color" : "#ff7800",
	"weight" : 5,
	"opacity" : 0.2
};


function Highlightfeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
 
 }
function Resethighlight(e) {
    geojson.resetStyle(e.target);
}

function ZoomTofeature(e) {
    map.fitBounds(e.target.getBounds());
}

geojson = L.geoJson(kcTracts,
	{
	style: jsonstyle,
	onEachFeature: onEachFeature
	}).addTo(map);

L.geoJson(kcNeighborhoods, {
style: jsonstyle,
  onEachFeature: onEachFeature
}).addTo(map);


function onEachFeature(feature, layer) {
    layer.on({
        mouseover: Highlightfeature,
        mouseout: Resethighlight,
        click: ZoomTofeature
    });
}


var Mycontrol = L.control();

Mycontrol.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'Mycontrol'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
Mycontrol.update = function (properties) {
    this._div.innerHTML = '<h3>Commuter population attributes </h3>' +  (properties ?
         'Id:' + properties["id"] + '<br/>' + 'Shid:'+ properties["shid"] + '<br/>' + 'Area:'+ properties["area"] + '<br/>' + 'pop-commute-drive_alone:'+ properties["pop-commute-drive_alone"] + '<br/>' +
         'pop-commute-drive_carpool:'+ properties["pop-commute-drive_carpool"] + '<br/>' + 'pop-commute-public_transit:'+ properties["pop-commute-public_transit"] + '<br/>' +
         'pop-commute-walk:'+ properties["pop-commute-walk"] : 'Hover over a commuter');
};



Mycontrol.addTo(map);

function Highlightfeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
  Mycontrol.update(layer.feature.properties);
 }
function Resethighlight(e) {
    geojson.resetStyle(e.target);
   // Mycontrol.update(layer.feature.properties);
}






