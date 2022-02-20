$(() => {
	generarNroPedido();
    mostrarDatos();
});

/* Al no existir interacción con una BD y al limpiar localstorage se pierde la correlación numérica,
el número de pedido lo genero por la combinación de la hora, minutos y segundo*/
function generarNroPedido() {
	let hoy = new Date();
	let hora = hoy.getHours() + '' + hoy.getMinutes() + '' + hoy.getSeconds();
	$("#pedido").val(hora);
}

/* Muestro apartado para carga de datos del comprador */
function mostrarDatos() {
$(document).on('click', '#avanzaDatos',()=>{
	const nodoR =$("#formDatos");
	nodoR.hide()
	.delay(250)
	.fadeIn('slow')
    })
}

/* Proceso de envío de correo electrónico con datos de la compra mediante servicio EmailJS */
$('#procesar-compra').on('submit', function(event) {
    event.preventDefault();
    var formData = new FormData(this);
    /* Conexión al servidor y validación */
    formData.append('service_id', 'service_5v41086');
    formData.append('template_id', 'template_qmmvsxr');
    formData.append('user_id', 'user_duv0L9DZ6iALdtDnFDijs');
    $.ajax('https://api.emailjs.com/api/v1.0/email/send-form', {
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false
    }).done(function() {
        alert('e-mail de confirmación de pedido enviado.');
    }).fail(function(error) {
        alert('No se pudo enviar el email de confirmación.' + JSON.stringify(error));
    });
});


