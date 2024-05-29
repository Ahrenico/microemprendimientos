function main() {


}

function dibujarMapa() {


}

function dibujarUbicacion() {

}

function dibujarZonaDeInfluencia() {


}

function leerJson() {

}

function agregarEmprendimiento() {


}



function buscarPorNombre(nombre) {


}

function buscarPorRubro(rubro) {


}

function obtenerEmprendimiento(id) {


}


function normalizarDireccion(direccion) {

    const apiUrl = 'http://servicios.usig.buenosaires.gob.ar/normalizar';

    const url = new URL(apiUrl);
    url.searchParams.append('direccion', direccion);

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al normalizar la dirección');
            }
            return response.json();
        })
        .then(data => {

            return mostrarSugerenciasDeDireccionesNormalizadas(data);

        })
        .catch(error => {
            console.error('Error al normalizar la dirección:', error);
        });
}

function mostrarSugerenciasDeDireccionesNormalizadas(data) {// devuelve un array con las sugerencias de direcciones
    let direcciones = [];
    const entries = Object.entries(data);
    entries.forEach(([key, value]) => {
        const a = Object.entries(value);
        a.forEach(([key, value]) => {
            const b = Object.entries(value);
            b.forEach(([key, value]) => {
                if (key == 'direccion') {
                    direcciones.push(value);
                }
            })
        })
    })
    console.log(direcciones.join("--"))
    return direcciones;


}

const direccion = "peron 9000";
normalizarDireccion(direccion);
