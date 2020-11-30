

// Variables
let baseDeDatos = [
    {
        id: 1,
        nombre: 'Individual económica (baño privado externo) con 1 cama individual',
        precio: 149.90,
        imagen: 'IMG/Individual_Economica.jpg'
    },
    {
        id: 2,
        nombre: 'Individual (1 cama individual) con baño privado',
        precio: 179.90,
        imagen: 'IMG/Individual.jpg'
    },
    {
        id: 3,
        nombre: 'Doble (baño privado) con 1 cama doble',
        precio: 199.90,
        imagen: 'IMG/Cama_Doble.jpg'
    },
    {
        id: 4,
        nombre: 'Twin (baño privado) con 2 camas individuales.',
        precio: 219.90,
        imagen: 'IMG/Doble_Cama.jpg'
    },
    
    {
        id: 5,
        nombre: 'Habitación triple (baño privado) con 1 cama doble y 1 cama individual.',
        precio: 279.90,
        imagen: 'IMG/Cama_Triple.jpg'
    },
    {
        id: 6,
        nombre: 'Habitación triple (baño privado) con 3 camas individuales',
        precio: 299.90,
        imagen: 'IMG/Cama_Triple_Individual.png'
    },
    {
        id: 7,
        nombre: 'Habitación cuádruple (baño privado) con 1 cama doble y 2 camas individuales',
        precio: 329.90,
        imagen: 'IMG/Cama_Cuadruple_2y1.jpg'
    },
    {
        id: 8,
        nombre: 'Habitacion cuadruple (baño privado) con 4 camas individuales',
        precio: 349.90,
        imagen: 'IMG/Cama_Cuadruple.jpg'
    },
    {
        id: 9,
        nombre: 'Habitación Matrimonial (baño privado con jacuzzi) con 1 cama doble y servicio especial',
        precio: 389.90,
        imagen: 'IMG/Cama_Matrimonial.png'
    },
]
let $items = document.querySelector('#items');
let carrito = [];
let total = 0;
let $carrito = document.querySelector('#carrito');
let $total = document.querySelector('#total');
let $botonVaciar = document.querySelector('#boton-vaciar');

// Funciones
function renderItems() {
    for (let info of baseDeDatos) {
        // Estructura
        let miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4');
        // Body
        let miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        miNodoCardBody.align = 'center';
        // Titulo
        let miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info['nombre'];
        // Imagen
        let miNodoImagen = document.createElement('img');
        miNodoImagen.height= 145;
        miNodoImagen.width= 175;
        miNodoImagen.setAttribute('src', info['imagen']);
        // Precio
        let miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = 'S/ ' + info['precio'];
        // Boton 
        let miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-info');
        miNodoBoton.textContent = 'Añadir';
        miNodoBoton.setAttribute('marcador', info['id']);
        miNodoBoton.addEventListener('click', anyadirCarrito);
        // Insertamos
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        $items.appendChild(miNodo);
    }
}
function anyadirCarrito() {
    // Añadimos el Nodo a nuestro carrito
    carrito.push(this.getAttribute('marcador'))
    // Calculo el total
    calcularTotal();
    // Renderizamos el carrito 
    renderizarCarrito();

}

function renderizarCarrito() {
    // Vaciamos todo el html
    $carrito.textContent = '';
    // Quitamos los duplicados
    let carritoSinDuplicados = [...new Set(carrito)];
    // Generamos los Nodos a partir de carrito
    carritoSinDuplicados.forEach(function (item, indice) {
        // Obtenemos el item que necesitamos de la variable base de datos
        let miItem = baseDeDatos.filter(function(itemBaseDatos) {
            return itemBaseDatos['id'] == item;
        });
        // Cuenta el número de veces que se repite el producto
        let numeroUnidadesItem = carrito.reduce(function (total, itemId) {
            return itemId === item ? total += 1 : total;
        }, 0);
        // Creamos el nodo del item del carrito
        let miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0]['nombre']} - S/ ${miItem[0]['precio']}`;
        // Boton de borrar
        let miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.setAttribute('item', item);
        miBoton.addEventListener('click', borrarItemCarrito);
        // Mezclamos nodos
        miNodo.appendChild(miBoton);
        $carrito.appendChild(miNodo);
    })
}

function borrarItemCarrito() {
    // Obtenemos el producto ID que hay en el boton pulsado
    let id = this.getAttribute('item');
    // Borramos todos los productos
    carrito = carrito.filter(function (carritoId) {
        return carritoId !== id;
    });
    // volvemos a renderizar
    renderizarCarrito();
    // Calculamos de nuevo el precio
    calcularTotal();
}

function calcularTotal() {
    // Limpiamos precio anterior
    total = 0;
    // Recorremos el array del carrito
    for (let item of carrito) {
        // De cada elemento obtenemos su precio
        let miItem = baseDeDatos.filter(function(itemBaseDatos) {
            return itemBaseDatos['id'] == item;
        });
        total = total + miItem[0]['precio'];
    }
    // Renderizamos el precio en el HTML
    $total.textContent = total.toFixed(2);
}

function vaciarCarrito() {
    // Limpiamos los productos guardados
    carrito = [];
    // Renderizamos los cambios
    renderizarCarrito();
    calcularTotal();
}

//Boton Enviar Reserva, se guarda del cliente y su email
function guardarDato() {
    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;
    var tarjeta = document.getElementById("tarjeta").value;
    var cvv = document.getElementById("cvv").value;
    localStorage.setItem(nombre, email, tarjeta, cvv);
    document.getElementById("nombre").value = "";
    document.getElementById("email").value = "";
    document.getElementById("tarjeta").value = "";
    document.getElementById("cvv").value = "";
    actualizarDatos();
    alerta();
}
function actualizarDatos() {
    var registro = "";
    if (localStorage.length === 0) {
        registro += '<li>Vacío</li>';
    } else {
        for (var i = 0; i <= localStorage.length - 1; i++) {
            var key = localStorage.key(i);
            registro += '<li>' + '<span class="nom">' + key + '</span>' +
                '<span class="nom">' + localStorage.getItem(key) + '</span>' + '</li><br>';
        }
    }
    document.getElementById('carro').innerHTML = registro;
}
function alerta(){ 
    var mensaje;
    var opcion = confirm("¿Quiere Confirmar la Reserva de la(s) habitacion(es) en Walomar?");
    if (opcion == true) {
        mensaje = "La Reserva a sido CONFIRMADA";
	} else {
	    mensaje = "La Reserva a sido ANULADA";
	}
	document.getElementById("carro").innerHTML = mensaje;
}

// Eventos
$botonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
renderItems();