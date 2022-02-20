$(() => {
	obtenerProductos();
	imprimirCarrito(carrito);
	cargarCarrito(carrito);
});

// Define variables
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let productos;
// Conexión a "BD" Local
function obtenerProductos() {
	$.get("/data/productos.json", (respuesta) => {
		productos = respuesta.productos;
		cargarProductos(productos, true);
	});
}

// Carga de productos en BD a DOM 
function cargarProductos(array) {
	$("#equipos").empty();
    array.forEach((prod) => {
			$("#equipos").append(
			$(`
				<div class="col-md-4 col-md-6 text-center">
				<img id="img-dest" src="${prod.url}" alt="${prod.nombre}">
                        <h4>${prod.nombre}</h4>
						<h5>Microprocesador: ${prod.micro}</h5>
						<h5>Motherboard: ${prod.mother}</h5>
						<h5>Memoria RAM: ${prod.ram}</h5>
						<h5>Placas de video: ${prod.placas}</h5>
						<h5>Cantidad de placas: ${prod.cantidad}</h5>
                        <h5>Total MH/S: ${prod.mhs}</h5>
						<h5>Ingresos diarios USD: ${prod.mhs}</h5>
						<h5>Precio USD: ${prod.precio}</h5>
						<br>
						<br>
						<button type="button" class="btn btn-dark" id="${prod.id}" onclick="agregarAlCarrito(event)">Añadir</button>
						<br>
						<br>
						<hr>
				</div>		
            `)
		);
	});
}

// Agrega RIG al carrito 
function agregarAlCarrito(e) {
	e.target.textContent = "Añadido";
	e.target.disabled = true;

	let id = Number(e.target.id);
	let productoElegido = productos.find((p) => p.id === id);

	carrito.push(productoElegido);

	localStorage.setItem("carrito", JSON.stringify(carrito));

	imprimirCarrito(carrito);

	cargarCarrito(carrito);
}

// Elimina RIG del carrito 
function eliminarItem(e) {
	let id = Number(e.target.id);
	let index = carrito.findIndex((p) => p.id === id);

	carrito.splice(index, 1);

	imprimirCarrito(carrito);

	localStorage.setItem("carrito", JSON.stringify(carrito));

	cargarProductos(productos, false);

	cargarCarrito(carrito);
}

// Carga selección en carrito MODAL 
function imprimirCarrito(array) {
	$("#carrito").empty();
	let total = 0;
	array.forEach((prod) => {
		total = total + prod.precio;
		$("#carrito").append(`
        <tr>
            <td>${prod.nombre}</td>
            <td>USD: ${prod.precio}</td>
            <td><button type="button" class="btn btn-warning" id="${prod.id}" class="eliminar" onclick="eliminarItem(event)">Quitar</button></td>
        </tr>
        `);
	});

	$("#carrito").append(`
	<br>
	<hr>
	<span class="total">Total USD: ${total.toFixed(2)}`);
}

// Carga selección en carrito para ser llamado desde página de compra
function cargarCarrito(array) {
	$("#carrito2").empty();
	let total = 0;
	array.forEach((prod) => {
		total = total + prod.precio;
		$("#carrito2").append(`
        <tr>
            <td>${prod.nombre}</td>
			<td>
				<ul class="listas">
					<li>1</li>
					<li>1</li>
					<li>1</li>
					<li>6</li>
				</ul>
			</td>
			<td>
				<ul class="listas">
					<li>Microprocesador: ${prod.micro}</li>
					<li>Motherboard: ${prod.mother}</li>
					<li>Memoria RAM: ${prod.ram}</li>
					<li>Placa de video: ${prod.placas}</li>
				</ul>
			</td>
            <td>USD: ${prod.precio}</td>
            <td><button type="button" class="btn btn-warning" id="${prod.id}" class="eliminar" onclick="eliminarItem(event)">Quitar</button></td>
        </tr>
        `);
	});

	$("#carrito2").append(`
	<br>
	<span class="total"><strong>Total USD: ${total.toFixed(2)}<strong>
	<br>
	`);

	$("#totalPagar").val(total);
	// Oculta Formulario de Datos Personales para uso del Cliente
	const nodoR =$("#formDatos");
	nodoR.hide()
}

$("#avanzaDatos").append(`
	<button type="button" class="btn btn-success">Continuar</button>

	<hr>
	`);

// Vacía completamente el carrtio - borra localStorage
$(document).on('click', '#vaciar-carrito',()=>{
	localStorage.clear();
})

// Envío de Datos a la página de compra
$(document).on('click', '#procesar-pedido',()=>{
	location.href = "../pages/compra.html";
})


