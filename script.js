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

// --- Variables del Juego ---
let palabrasPosibles = ["estipulacion", "devengar", "patrono", "plaza", "prestacion", "otorgamiento", "horario", "beneficios", "derechos", "obligaciones","reglamento","inciso","estipulacion","avenimiento"];
let palabraActual = '';
let puntuacion = 0;
let vidas = 3;
let tiempoRestante = 30;
let timerInterval;

// --- Funciones del Juego ---

function seleccionarPalabraAleatoria() {
    const indiceAleatorio = Math.floor(Math.random() * palabrasPosibles.length);
    return palabrasPosibles[indiceAleatorio];
}

function desordenarPalabra(palabra) {
    let letras = palabra.split('');
    for (let i = letras.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letras[i], letras[j]] = [letras[j], letras[i]];
    }
    // Asegurarse de que la palabra desordenada no sea igual a la original
    const palabraDesordenada = letras.join('');
    return palabraDesordenada === palabra ? desordenarPalabra(palabra) : palabraDesordenada;
}

function iniciarNuevaRonda() {
    clearInterval(timerInterval); // Limpiar cualquier timer anterior

    if (vidas <= 0) {
        mostrarPantallaGameOver();
        return;
    }

    // Resetear visuales y estado para la nueva ronda
    mensajeResultado.textContent = '';
    inputRespuesta.value = '';
    inputRespuesta.disabled = false;
    inputRespuesta.focus();
    btnComprobar.style.display = 'inline-block';
    btnNuevaPalabra.style.display = 'none';
    btnReiniciar.style.display = 'none';
    timerDisplay.style.color = '#d62828'; // Color por defecto del timer

    // Seleccionar y mostrar nueva palabra
    palabraActual = seleccionarPalabraAleatoria();
    const palabraDesordenada = desordenarPalabra(palabraActual);
    palabraDesordenadaDisplay.textContent = palabraDesordenada.toUpperCase();

    // Iniciar el temporizador
    tiempoRestante = 30;
    timerDisplay.textContent = tiempoRestante;
    timerInterval = setInterval(actualizarTimer, 1000);
}

function actualizarTimer() {
    tiempoRestante--;
    timerDisplay.textContent = tiempoRestante;

    if (tiempoRestante < 10) {
        timerDisplay.style.color = '#d62828'; // Rojo cuando queda poco tiempo
    }

    if (tiempoRestante <= 0) {
        clearInterval(timerInterval);
        vidas--;
        vidasDisplay.textContent = vidas;
        mensajeResultado.textContent = `¡Tiempo agotado! La palabra era: "${palabraActual}".`;
        mensajeResultado.style.color = 'red';
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
    
    clearInterval(timerInterval); // Detener el timer al responder

    if (respuestaUsuario === palabraActual) {
        puntuacion++;
        puntuacionDisplay.textContent = puntuacion;
        mensajeResultado.textContent = '¡Correcto! 🎉';
        mensajeResultado.style.color = 'green';
    } else {
        vidas--;
        vidasDisplay.textContent = vidas;
        mensajeResultado.textContent = `Incorrecto. La palabra era: "${palabraActual}".`;
        mensajeResultado.style.color = 'red';
    }
    finalizarRonda();
}

function finalizarRonda() {
    inputRespuesta.disabled = true;
    btnComprobar.style.display = 'none';

    if (vidas <= 0) {
        mostrarPantallaGameOver();
    } else {
        btnNuevaPalabra.style.display = 'inline-block';
    }
}

function mostrarPantallaGameOver() {
    palabraDesordenadaDisplay.textContent = 'FIN';
    mensajeResultado.innerHTML = `¡Juego Terminado!<br>Puntuación Final: ${puntuacion}`;
    mensajeResultado.style.color = '#001f3f';
    btnComprobar.style.display = 'none';
    btnNuevaPalabra.style.display = 'none';
    btnReiniciar.style.display = 'inline-block';
    inputRespuesta.disabled = true;
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
document.addEventListener('DOMContentLoaded', reiniciarJuego);