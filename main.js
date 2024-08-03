
/* JS destinado al ejercicio de IMC, Utilizando evento submit */


document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault()
    const alto = parseFloat(document.getElementById('altura').value) / 100
    const kilo = parseFloat(document.getElementById('kg').value)

    if (alto > 0 && kilo > 0) {
        const IMC = kilo / (alto * alto)
        const resultado = "Tu IMC es: " + IMC.toFixed(2)
        document.getElementById('rs').value = resultado
    } else {
        document.getElementById('rs').value = 'Introduce valores validos'
    }

})


/* JS destinado al ejercicio de Corversor de Divisa, inclui varios eventos focos y blur para lograr hacer
todo en una sola funcion, debido a que generaba un conflicto al querer editar el siguiente campo pues no identificaba
bien a quien se estaba editando*/


const dolares = document.getElementById('dolar');
const pesoMx = document.getElementById('peso');
const tazaC = 18.63;
let editar = 0;

dolares.addEventListener('focus', () => {
    editar = 'dolar';
});
pesoMx.addEventListener('focus', () => {
    editar = 'peso';
});

dolares.addEventListener('blur', () => {
    editar = 0;
});
pesoMx.addEventListener('blur', () => {
    editar = 0;
});



function actualizar() {
    const dolar = parseFloat(dolares.value) || 0;
    const peso = parseFloat(pesoMx.value) || 0;
    if (editar === 'dolar') {
        if (dolar > 0) {
            pesoMx.value = (dolar * tazaC).toFixed(2);
        }
    } else if (editar === 'peso') {
        if (peso > 0) {
            dolares.value = (peso / tazaC).toFixed(2);
        }
    }
}


dolares.addEventListener('keyup', actualizar);
pesoMx.addEventListener('keyup', actualizar);




//Aca lo pesao
/* JS destinado al ejercicio de Eventos, en este ejercicio todo fue complejo agrego comentarios por partes */

//Arreglo con un par de notas que se piden al inicio

const arregloNotas = [
    {
        id: 1,
        titulo: 'sacar la basura',
        texto: 'hay que sacar la basura',
        realizada: false
    },
    {
        id: 2,
        titulo: 'hacer los ejercicios',
        texto: 'hay que apurarse a hacer los ejercicios',
        realizada: false
    }

]

/*Definicion de variable global que servira de referencia usando un ternario para verificar que el array contiene algo y
en ese caso nos retorne la posicion que se define -1 debido a que es longitud y el array comienza en 0, caso contrario siempre se comienza en 0 */

let idGlobal = arregloNotas.length > 0 ? arregloNotas[arregloNotas.length - 1].id : 0

//Funcion para pintar notas, contiene lo necesario para pintar las nuevas notas

const pintarNotas = (notas = arregloNotas) => {
    let lugar = document.getElementById("contenedorNota")

    lugar.innerHTML = ''

    if (notas.length === 0) {
        lugar.innerHTML = '<p class="text-center">No hay notas para mostrar</p>'
        return
    }

    notas.forEach(nota => {
        let divNota = document.createElement('div');
        divNota.className = 'col-md-4 mb-3 d-flex flex-column m-3 ';
        divNota.innerHTML = `
            <div class="card nota-card">
                <div class="card-body border d-flex flex-column">
                    <div class="d-flex align-items-center mb-2">
                        <input onClick="marcarRealizada(${nota.id})" type="checkbox" ${nota.realizada ? "checked" : ""} class="me-2">
                        <h5 class="card-title mb-0">${nota.titulo}</h5>
                    </div>
                    <p class="card-text">${nota.texto}</p>
                    <button class="btn btn-danger" onclick="borrarNota(${nota.id})">Borrar Nota</button>
                </div>
            </div>
        `;
        lugar.appendChild(divNota);
    })

}

//Funcion agregar notas

let agregar = (titulo, texto) => {
    const nueva = {
        id: idGlobal + 1,
        titulo: titulo,
        texto: texto,
        realizada: false
    }
    arregloNotas.push(nueva)
    idGlobal++
    aplicarFiltros()

}

//Evento para usar la funcion anterior y comprobar campos llenos

document.getElementById('guardar').addEventListener('click', () => {

    let titulo = document.getElementById('titulo').value
    let texto = document.getElementById('texto').value

    if (titulo && texto) {
        agregar(titulo, texto)
        document.getElementById('titulo').value = ''
        document.getElementById('texto').value = ''
    } else {
        alert('Porfavor no deje campos vacios')
    }


})

//Funcion para eliminar notas, se llama desde el oneClick

let borrarNota = (id) => {
    const posicion = arregloNotas.findIndex(nota => nota.id === id)
    if (posicion >= 0) {
        arregloNotas.splice(posicion, 1)
        aplicarFiltros()
    }

}

//Evento para usar realizar una limpieza de campos simple.

document.getElementById('limpiar').addEventListener('click', () => {
    document.getElementById('titulo').value = ""
    document.getElementById('texto').value = ""

})

//Funcion para hacer que el check trabaje tipo toggle para cambiar el boleano esta funcion es llamada mediante Oneclik proporcionado pdf

let marcarRealizada = (id) => {
    const posicion = arregloNotas.findIndex(nota => nota.id === id)
    if (posicion >= 0) {
        arregloNotas[posicion].realizada = !arregloNotas[posicion].realizada
        aplicarFiltros()
    }
}

//Funcion simple para filtrar el checkbox mencionado antes

const filtrarRealizadas = (notas) => {
    return notas.filter(nota => nota.realizada)
}

/* Funcion para filtrar por texto, inclui toLowerCase para que no falle la distincion entee mayuscula y minuscula
la funcion incluye buscar en titulo o texto contenido de la nota */

const filtrarTexto = (notas, buscar) => {
    return notas.filter(nota => nota.titulo.toLowerCase().includes(buscar.toLowerCase()) || nota.texto.toLowerCase().includes(buscar.toLowerCase())

    )

}

/* funcion para aplicar filtros compuesta de filtros que se hicieron en puntos anteriores, condicionadas para interactuar entre si
esta funcion reemplaza a pintar notas en puntos anteriores debido a que de esa manera trabaja correctamente el pintado. */

const aplicarFiltros = () => {
    const texto = document.getElementById('buscarTexto').value
    const soloRealizadas = document.getElementById('filtrarRealizadas').checked
    let notasFiltradas = arregloNotas

    if (soloRealizadas) {
        notasFiltradas = filtrarRealizadas(notasFiltradas)
    }

    notasFiltradas = filtrarTexto(notasFiltradas, texto)
    pintarNotas(notasFiltradas)
}

// eventos para llamar a la funcion anterior

document.getElementById('buscarTexto').addEventListener('input', aplicarFiltros)
document.getElementById('filtrarRealizadas').addEventListener('change', aplicarFiltros)

//Primer impresion de las notas en pantalla

pintarNotas()