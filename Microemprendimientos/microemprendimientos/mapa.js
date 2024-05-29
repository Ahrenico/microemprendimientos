// Inicializa el mapa
var customCRS = L.CRS.proj4js('srid: 4326', '+proj=utm +zone=30 +ellps=GRS80');
var mymap = L.map('mapid',{crs: customCRS
  
}).setView([-58.7014262918367, -34.5499751285714], 13);

// Añade el mapa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

// Añade un marcador en una ubicación específica
L.marker([-58.7014262918367, -34.5499751285714]).addTo(mymap)
  .bindPopup('¡Hola! Este es un marcador.').openPopup();
