// --- Elementos del DOM (Document Object Model) ---
// Obtenemos referencias a los elementos HTML que necesitamos manipular
const palabraDesordenadaDisplay = document.getElementById('palabra-desordenada');
const inputRespuesta = document.getElementById('input-respuesta');
const btnComprobar = document.getElementById('btn-comprobar');
const mensajeResultado = document.getElementById('mensaje-resultado');
const puntuacionDisplay = document.getElementById('puntuacion');
const btnNuevaPalabra = document.getElementById('btn-nueva-palabra');

// --- Variables del Juego ---
let palabrasPosibles = [
    "elefante",
    "computadora",
    "bicicleta",
    "sol",
    "agua",
    "programacion",
    "javascript",
    "desarrollo",
    "internet",
    "navegador"
];
let palabraActual = ''; // Almacenará la palabra original que el jugador debe adivinar
let puntuacion = 0;

// --- Funciones del Juego ---

/**
 * Selecciona una palabra aleatoria de la lista de palabras posibles.
 * @returns {string} La palabra seleccionada.
 */
function seleccionarPalabraAleatoria() {
    const indiceAleatorio = Math.floor(Math.random() * palabrasPosibles.length);
    return palabrasPosibles[indiceAleatorio];
}

/**
 * Desordena las letras de una palabra.
 * @param {string} palabra La palabra a desordenar.
 * @returns {string} La palabra con las letras desordenadas.
 */
function desordenarPalabra(palabra) {
    let letras = palabra.split(''); // Convierte la palabra en un arreglo de letras
    for (let i = letras.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letras[i], letras[j]] = [letras[j], letras[i]]; // Intercambia las letras
    }
    return letras.join(''); // Une el arreglo de letras de nuevo en una cadena
}

/**
 * Inicia una nueva ronda del juego.
 */
function iniciarNuevaRonda() {
    palabraActual = seleccionarPalabraAleatoria(); // Selecciona una palabra
    const palabraDesordenada = desordenarPalabra(palabraActual); // Desordena la palabra

    palabraDesordenadaDisplay.textContent = palabraDesordenada.toUpperCase(); // Muestra la palabra desordenada en mayúsculas
    inputRespuesta.value = ''; // Limpia el campo de respuesta
    mensajeResultado.textContent = ''; // Limpia el mensaje de resultado

    // Asegura que los botones estén en el estado correcto
    btnComprobar.style.display = 'inline-block'; // Muestra el botón de comprobar
    btnNuevaPalabra.style.display = 'none'; // Oculta el botón de nueva palabra
    inputRespuesta.disabled = false; // Habilita el input
    inputRespuesta.focus(); // Pone el foco en el input para que el usuario pueda escribir de inmediato
}

/**
 * Comprueba la respuesta del jugador.
 */
function comprobarRespuesta() {
    const respuestaUsuario = inputRespuesta.value.toLowerCase().trim(); // Obtiene la respuesta del usuario, la convierte a minúsculas y elimina espacios al inicio/final

    if (respuestaUsuario === palabraActual) {
        mensajeResultado.textContent = '¡Correcto! 🎉';
        mensajeResultado.style.color = 'green';
        puntuacion++;
        puntuacionDisplay.textContent = puntuacion;
        btnComprobar.style.display = 'none'; // Oculta el botón de comprobar
        btnNuevaPalabra.style.display = 'inline-block'; // Muestra el botón de nueva palabra
        inputRespuesta.disabled = true; // Deshabilita el input
    } else if (respuestaUsuario === '') {
        mensajeResultado.textContent = 'Por favor, escribe una palabra.';
        mensajeResultado.style.color = 'orange';
    } else {
        mensajeResultado.textContent = `Incorrecto. Intenta de nuevo.`;
        mensajeResultado.style.color = 'red';
        // Podríamos añadir una penalización de puntos aquí si quisiéramos
    }
}

// --- Event Listeners (Detectores de Eventos) ---

// Cuando se haga clic en el botón "Comprobar"
btnComprobar.addEventListener('click', comprobarRespuesta);

// Cuando se presione la tecla "Enter" en el campo de respuesta
inputRespuesta.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        comprobarRespuesta();
    }
});

// Cuando se haga clic en el botón "Nueva Palabra"
btnNuevaPalabra.addEventListener('click', iniciarNuevaRonda);

// --- Inicio del Juego ---
// Llama a esta función cuando la página se carga para iniciar la primera ronda
document.addEventListener('DOMContentLoaded', iniciarNuevaRonda);