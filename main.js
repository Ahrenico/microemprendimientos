function normalizarDireccion(direccion) {
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
            return mostrarSugerenciasDeDireccionesNormalizadas(data);
        })
        .catch(error => {
            console.error('Error al normalizar la dirección:', error);
            return []; // Retornar un arreglo vacío en caso de error
        });
}

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

    

  console.log(direcciones);

    return direcciones;
}


function mostrarSugerenciasDeDireccionesNormalizadas(data) {
    var direcciones = [];
    var entries = Object.entries(data);
    entries.forEach(([key, value]) => {
        const a = Object.entries(value);
        a.forEach(([key, value]) => {
            const b = Object.entries(value);
            b.forEach(([key, value]) => {
                if (key === 'direccion') {
                    direcciones.push(value);
                }

            });
        });
    });



    return direcciones;
}

//const direccion = "peron 9000";
//normalizarDireccion(direccion);

let searchInput = document.getElementById('direccion');
let sugerencias = document.getElementById('resultados');
let lista = ["a", "b", "c"];
let direccion;

function mostrarResultados() {
    normalizarDireccion(searchInput.value)
        .then(direcciones => {
            lista = direcciones;
            obtenerResultados();
        })
        .catch(error => {
            console.error('Error al obtener las direcciones normalizadas:', error);
        });
}

function obtenerResultados() {

    sugerencias.innerHTML = '';

    lista.forEach(item => {
        const sugerencia = document.createElement('div');
        sugerencia.classList.add('autocomplete-item');
        sugerencia.innerText = item;
        sugerencia.addEventListener('click', () => {
            searchInput.value = item;
            console.log(item);
            sugerencias.innerHTML = '';
        });
        sugerencias.appendChild(sugerencia);
    });
}

searchInput.addEventListener('input', mostrarResultados);

// Agregar evento de selección al hacer clic en cualquier parte del documento
document.addEventListener('click', (event) => {
    if (!sugerencias.contains(event.target) && event.target !== searchInput) {
        sugerencias.innerHTML = '';
    }
});