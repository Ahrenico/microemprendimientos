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
            return obtenerSugerenciasDeDireccionesNormalizadas(data);
        })
        .catch(error => {
            console.error('Error al normalizar la dirección:', error);
            return []; // Retornar un arreglo vacío en caso de error
        });
}

function obtenerSugerenciasDeDireccionesNormalizadas(data) {
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


let direccionEmprendimiento = document.getElementById('direccionEmprendimiento');
let direccionEmprendimientolabel1 = document.getElementById('direccionEmprendimientolabel1');
let direccionEmprendimientolabel2 = document.getElementById('direccionEmprendimientolabel2');
let direccionPersonal = document.getElementById('direccionPersonal');
let sugerenciasEmprendimiento = document.getElementById('resultadosEmprendimiento');
let sugerenciasPersonal = document.getElementById('resultadosPersonal');
let lista = [];
let direccion;
let a = false;
direccionEmprendimiento.style.display= 'none';
direccionEmprendimientolabel1.style.display= 'none';
direccionEmprendimientolabel2.style.display= 'none';
document.getElementById('lugarFisicoSi').addEventListener('change',function(){
    if (document.getElementById('lugarFisicoSi').checked){
        direccionEmprendimiento.setAttribute('required', 'requiered');
        direccionEmprendimiento.style.display= 'block';
        direccionEmprendimientolabel1.style.display= 'block';
        direccionEmprendimientolabel2.style.display= 'block';
    }
})
document.getElementById('lugarFisicoNo').addEventListener('change',function(){
    if(document.getElementById('lugarFisicoNo').checked){
        direccionEmprendimiento.style.display= 'none';
        direccionEmprendimientolabel1.style.display= 'none';
        direccionEmprendimientolabel2.style.display= 'none';
        direccionEmprendimiento.removeAttribute('required');
        if(a === false){
            direccionEmprendimiento.value = '';
            sugerenciasEmprendimiento.innerHTML = '';
        }
    }
})

direccionEmprendimiento.addEventListener('input',()  => mostrarResultados(direccionEmprendimiento,sugerenciasEmprendimiento));
direccionPersonal.addEventListener('input',()  => mostrarResultados(direccionPersonal,sugerenciasPersonal));


function mostrarResultados(direccion,sugerencias) {
  a=false;
    normalizarDireccion(direccion.value)
        .then(direcciones => {
            lista = direcciones;
            mostrarSugerencias(direccion,sugerencias);
        })
        .catch(error => {
            console.error('Error al obtener las direcciones normalizadas:', error);
        });
}

function mostrarSugerencias(direccion,sugerencias) {

    sugerencias.innerHTML = '';

    lista.forEach(item => {
        const sugerencia = document.createElement('div');
        sugerencia.classList.add('autocomplete-item');
        sugerencia.innerText = item;
        direccion.addEventListener('blur', function(event) {
            if(a == false){
                direccion.focus()}

          });

        sugerencia.addEventListener('click', () => {
            direccion.value = item;
            sugerencias.innerHTML = '';
            a=true;

        });
        sugerencias.appendChild(sugerencia);
    });
}
