document.addEventListener("DOMContentLoaded", function() {
    let inputBusqueda = document.getElementById("search")
    let lista = document.getElementById("sugerencias");


    inputBusqueda.addEventListener("input", function() {
        if(inputBusqueda.value == ""){
            lista.innerHTML = "";
        }
        else {
            let busqueda = inputBusqueda.value.toLowerCase();
            fetch('emprendimientos.json')
            .then(response => response.json())
            .then(data => {
                let resultados = data.filter(item => item.colaborador.emprendimiento.nombre.toLowerCase().includes(busqueda));
                let resultadosOrdenados = resultados.sort((a, b) => b.colaborador.emprendimiento.destacado - a.colaborador.emprendimiento.destacado);
                insertarListaSugerencia(resultadosOrdenados);
            }) 
        }
    })
});

function insertarListaSugerencia(resultados) {
    let lista = document.getElementById("sugerencias");
    lista.innerHTML = '';

    if (resultados.length > 0) {
        resultados.forEach(item => {
            let listItem = document.createElement("li");
            listItem.append(item.colaborador.emprendimiento.nombre
                + ', ' +
                item.colaborador.emprendimiento.direccion);
            if(item.colaborador.emprendimiento.destacado){
                let itemDestacado = document.createElement("span");
                let itemDestacadoIcon = document.createElement("i");
                itemDestacadoIcon.classList.add("fa-regular");
                itemDestacadoIcon.classList.add("fa-star");
                itemDestacado.append(itemDestacadoIcon);
                listItem.append(itemDestacado);
                listItem.classList.add("item-destacado");
            }
            lista.append(listItem);
        });
    } else {
        let listItem = document.createElement("li");
        listItem.append('No se encontraron resultados');
        lista.append(listItem);
    }
}