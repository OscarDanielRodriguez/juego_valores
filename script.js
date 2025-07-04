// --- Elementos del DOM ---
const palabraDesordenadaDisplay = document.getElementById('palabra-desordenada');
const inputRespuesta = document.getElementById('input-respuesta');
const btnComprobar = document.getElementById('btn-comprobar');
const mensajeResultado = document.getElementById('mensaje-resultado');
const puntuacionDisplay = document.getElementById('puntuacion');
const btnNuevaPalabra = document.getElementById('btn-nueva-palabra');
const vidasDisplay = document.getElementById('vidas-display');
const timerDisplay = document.getElementById('timer-display');
const btnReiniciar = document.getElementById('btn-reiniciar');
const btnPista = document.getElementById('btn-pista');
const pistaDisplay = document.getElementById('pista-display');

// --- Estructura de Datos con Palabras y Pistas ---
const palabrasConPistas = [
    { palabra: "estipulacion", pista: "Disposición, promesa o condición en un documento o contrato." },
    { palabra: "devengar", pista: "Derecho a recibir una cantidad de dinero como pago por un trabajo o servicio." },
    { palabra: "contratantes", pista: "Cada una de las personas o partes que intervienen en un contrato." },
    { palabra: "fehaciente", pista: "Que prueba o da fe de algo de forma indudable." },
    { palabra: "patrono", pista: "Persona que emplea trabajadores a cambio de un salario." },
    { palabra: "plazo", pista: "Tiempo o término señalado para hacer algo." },
    { palabra: "testigos", pista: "Persona que da testimonio de algo o presencia un hecho." },
    { palabra: "prestacion", pista: "Servicio o ayuda que una autoridad exige o que se acuerda en un pacto." },
    { palabra: "otorgamiento", pista: "Acción de conceder o dar algo, como una licencia, un poder o un permiso." },
    { palabra: "horario", pista: "Tiempo durante el cual se desarrolla habitualmente una acción o un trabajo." },
    { palabra: "beneficios", pista: "Ventajas, ganancias o resultados positivos que se obtienen de algo." },
    { palabra: "derechos", pista: "Libertades o facultades que posee una persona y que son reconocidas por la ley." },
    { palabra: "obligaciones", pista: "Compromiso o deber que tiene una persona que cumplir." },
    { palabra: "reglamento", pista: "Conjunto de reglas o normas establecidas para regular un comportamiento." },
    { palabra: "consignado", pista: "Acción de destinar o entregar algo para un propósito específico." },
    { palabra: "avenimiento", pista: "Acuerdo entre partes que están en un proceso para terminar su relación bajo ciertas condiciones." },
    { palabra: "inciso", pista: "Cada uno de los párrafos o divisiones de un artículo de una ley o reglamento." }
];


// --- Variables del Juego ---
let palabraActual = '';
let pistaActual = ''; // Variable para guardar la pista actual
let puntuacion = 0;
let vidas = 3;
let tiempoRestante = 30;
let timerInterval;

// --- Funciones del Juego ---

function seleccionarPalabraAleatoria() {
    const indiceAleatorio = Math.floor(Math.random() * palabrasConPistas.length);
    return palabrasConPistas[indiceAleatorio];
}

function desordenarPalabra(palabra) {
    let letras = palabra.split('');
    for (let i = letras.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letras[i], letras[j]] = [letras[j], letras[i]];
    }
    const palabraDesordenada = letras.join('');
    return palabraDesordenada === palabra ? desordenarPalabra(palabra) : palabraDesordenada;
}

function iniciarNuevaRonda() {
    clearInterval(timerInterval);

    if (vidas <= 0) {
        mostrarPantallaGameOver();
        return;
    }
    
    // Resetear visuales
    mensajeResultado.textContent = '';
    inputRespuesta.value = '';
    inputRespuesta.disabled = false;
    inputRespuesta.focus();
    btnComprobar.style.display = 'inline-block';
    btnNuevaPalabra.style.display = 'none';
    btnReiniciar.style.display = 'none';
    btnPista.style.display = 'inline-block'; // Mostrar botón de pista
    btnPista.disabled = false; // Habilitar botón de pista
    pistaDisplay.style.display = 'none'; // Ocultar pista
    timerDisplay.style.color = '#04BF7B';

    // Seleccionar y mostrar nueva palabra y guardar su pista
    const seleccion = seleccionarPalabraAleatoria();
    palabraActual = seleccion.palabra;
    pistaActual = seleccion.pista;

    const palabraDesordenada = desordenarPalabra(palabraActual);
    palabraDesordenadaDisplay.textContent = palabraDesordenada.toUpperCase();

    // Iniciar el temporizador
    tiempoRestante = 30;
    timerDisplay.textContent = tiempoRestante;
    timerInterval = setInterval(actualizarTimer, 1000);
}

function mostrarPista() {
    pistaDisplay.textContent = `Pista: ${pistaActual}`;
    pistaDisplay.style.display = 'block'; // Mostrar el contenedor de la pista
    btnPista.disabled = true; // Deshabilitar el botón para que solo se use una vez
}

function actualizarTimer() {
    tiempoRestante--;
    timerDisplay.textContent = tiempoRestante;

    if (tiempoRestante < 10) {
        timerDisplay.style.color = '#d1495b'; // Rojo cuando queda poco tiempo
    }

    if (tiempoRestante <= 0) {
        clearInterval(timerInterval);
        vidas--;
        vidasDisplay.textContent = vidas;
        mensajeResultado.textContent = `¡Tiempo agotado! La palabra era: "${palabraActual}".`;
        mensajeResultado.style.color = '#d1495b';
        finalizarRonda();
    }
}

function comprobarRespuesta() {
    const respuestaUsuario = inputRespuesta.value.toLowerCase().trim();

    if (respuestaUsuario === '') {
        mensajeResultado.textContent = 'Por favor, escribe una palabra.';
        mensajeResultado.style.color = 'orange';
        return;
    }
    
    clearInterval(timerInterval);

    if (respuestaUsuario === palabraActual) {
        puntuacion++;
        puntuacionDisplay.textContent = puntuacion;
        mensajeResultado.textContent = '¡Correcto! 🎉';
        mensajeResultado.style.color = '#04BF7B';
    } else {
        vidas--;
        vidasDisplay.textContent = vidas;
        mensajeResultado.textContent = `Incorrecto. La palabra era: "${palabraActual}".`;
        mensajeResultado.style.color = '#d1495b';
    }
    finalizarRonda();
}

function finalizarRonda() {
    inputRespuesta.disabled = true;
    btnComprobar.style.display = 'none';
    btnPista.style.display = 'none'; // Ocultar botón de pista

    if (vidas <= 0) {
        mostrarPantallaGameOver();
    } else {
        btnNuevaPalabra.style.display = 'inline-block';
    }
}

function mostrarPantallaGameOver() {
    palabraDesordenadaDisplay.textContent = 'FIN';
    mensajeResultado.innerHTML = `¡Juego Terminado!<br>Puntuación Final: ${puntuacion}`;
    mensajeResultado.style.color = '#FFFFFF';
    btnComprobar.style.display = 'none';
    btnNuevaPalabra.style.display = 'none';
    btnPista.style.display = 'none';
    btnReiniciar.style.display = 'inline-block';
    inputRespuesta.disabled = true;
    pistaDisplay.style.display = 'none';
}

function reiniciarJuego() {
    puntuacion = 0;
    vidas = 3;
    puntuacionDisplay.textContent = puntuacion;
    vidasDisplay.textContent = vidas;
    iniciarNuevaRonda();
}

// --- Event Listeners ---
btnComprobar.addEventListener('click', comprobarRespuesta);
inputRespuesta.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        comprobarRespuesta();
    }
});
btnNuevaPalabra.addEventListener('click', iniciarNuevaRonda);
btnReiniciar.addEventListener('click', reiniciarJuego);
btnPista.addEventListener('click', mostrarPista); // Evento para el botón de pista
document.addEventListener('DOMContentLoaded', reiniciarJuego);