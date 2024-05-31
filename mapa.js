// Inicializa el mapa

//var customCRS = new L.Proj.CRS('srid: 4326', '+proj=utm +zone=30 +ellps=GRS80');
//L.CRS.proj4js('srid: 4326', '+proj=utm +zone=30 +ellps=GRS80');

var coordenadas = [-34.985105,-58.376218];//obtener del json
var nombreEmprendimiento = "nombreemprendimiento";//obtener del json

var mapa = L.map('mapa').setView(coordenadas, 15);

// Añade el mapa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mapa);

// Añade un marcador en una ubicación específica
L.marker(coordenadas).addTo(mapa)
  .bindPopup(nombreEmprendimiento).openPopup();