function crearjson(){
var colaborador={
    nombre: document.getElementById("nombre").value,
    apellido:document.getElementById("apellido").value,
    telefono:document.getElementById("telefono").value,
    contraseña:document.getElementById("contraseña").value,
    email:document.getElementById("email").value,
    emprendimiento: {
        nombre:document.getElementById("nombre-del-emprendimiento").value,
        descripcion:document.getElementById("descripcion-del-emprendimiento").value,
        rubro:document.getElementById("rubro").value,
        direccion:document.getElementById("direccion").value,
        coordenadas: obtenerCoordenadas(document.getElementById("direccion").value),
        contacto:document.getElementById("contacto").value,
        redes_sociales:document.getElementById("redes-sociales").value,
        formas_de_pago:document.getElementById("formas-de-pago").value,
        zona_de_influencia:document.getElementById("zona-de-influencia").value,
        restricciones:document.getElementById("restricciones").value,
        foto:document.getElementById("foto").value,
        horarios:document.getElementById("horarios").value,
        visibilidad:document.getElementById("visibilidad").value
    }

};


//console.log(colaborador);
//var coordenadas=document.getElementById("zona-de-influencia").value;
//console.log(coordenadas);
var obj = JSON.stringify(colaborador);
console.log(obj);
//const fs = require('fs');
//const filePath = 'emprendimientos.json';
//const data = fr.readAsDataURL("emprendimientos.json");


function obtenerCoordenadas(direccion){
    const apiUrl = 'http://servicios.usig.buenosaires.gob.ar/normalizar';

    const url = new URL(apiUrl);
    url.searchParams.append('direccion', direccion);

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al normalizar la dirección');
            }
            return response.json();
        })
        .then(data => {
            return mostrarCoordenadas(data);
        })
        .catch(error => {
            console.error('Error al normalizar la dirección:', error);
            return []; // Retornar un arreglo vacío en caso de error
        });
}

function mostrarCoordenadas(data){
    var direcciones = [];
    var entries = Object.entries(data);
    console.log(data);
    entries.forEach(([key, value]) => {
        const a = Object.entries(value);
            a.forEach(([key, value]) => {
                const b = Object.entries(value);
                b.forEach(([key, value]) => {
                if (key == 'coordenadas') {
                    const c = Object.entries(value);
                    c.forEach(([key, value]) => {
                        if (key == 'x' || key == 'y'){
                            direcciones.push(value);
                        }})
                   
                }
            });
        });
    })
}}