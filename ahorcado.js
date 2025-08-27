document.addEventListener('DOMContentLoaded', () => {
    const wordDisplay = document.getElementById('word-display');
    const wrongLettersDisplay = document.getElementById('wrong-letters');
    const remainingGuessesDisplay = document.getElementById('remaining-guesses');
    const keyboardContainer = document.getElementById('keyboard');
    const gameStatus = document.getElementById('game-status');
    const restartButton = document.getElementById('restart-button');
    const hangmanParts = [
        document.getElementById('hangman-head'),
        document.getElementById('hangman-body'),
        document.getElementById('hangman-left-arm'),
        document.getElementById('hangman-right-arm'),
        document.getElementById('hangman-left-leg'),
        document.getElementById('hangman-right-leg')
    ];

    // Define the CSS classes for each part of the hangman
    const hangmanClasses = [
        'show-head',
        'show-body',
        'show-left-arm',
        'show-right-arm',
        'show-left-leg',
        'show-right-leg'
    ];

    const words = ['programacion', 'desarrollo', 'html', 'css', 'javascript', 'tecnologia', 'innovacion', 'frontend', 'backend'];
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';

    let selectedWord = '';
    let guessedWord = [];
    let wrongLetters = [];
    let remainingGuesses = 6;

    /**
     * @function startGame
     * @description Inicia un nuevo juego del ahorcado.
     */
    function startGame() {
        // Selecciona una palabra al azar
        selectedWord = words[Math.floor(Math.random() * words.length)];
        
        // Inicializa la palabra adivinada con guiones bajos
        guessedWord = Array(selectedWord.length).fill('_');
        
        // Reinicia las letras incorrectas y los intentos
        wrongLetters = [];
        remainingGuesses = 6;
        
        // Oculta todas las partes del ahorcado quitando las clases CSS
        hangmanParts.forEach((part, index) => {
            part.classList.remove(hangmanClasses[index]);
        });
        
        // Actualiza el DOM
        updateDisplay();
        gameStatus.textContent = '¡Adivina la palabra!';
        restartButton.style.display = 'none';
        keyboardContainer.style.display = 'grid';
        
        // Habilita los botones del teclado
        createKeyboard();
    }

    /**
     * @function createKeyboard
     * @description Crea el teclado virtual con botones de letras.
     */
    function createKeyboard() {
        keyboardContainer.innerHTML = '';
        const keyboardWrapper = document.createElement('div');
        keyboardWrapper.classList.add('keyboard-wrapper');
        
        for (const letter of alphabet) {
            const button = document.createElement('button');
            button.classList.add('action-button', 'keyboard-button');
            button.textContent = letter.toUpperCase();
            // Utiliza un atributo data para identificar la letra
            button.setAttribute('data-letter', letter);
            button.addEventListener('click', () => handleGuess(letter));
            keyboardWrapper.appendChild(button);
        }
        keyboardContainer.appendChild(keyboardWrapper);
    }

    /**
     * @function handleGuess
     * @description Maneja la lógica cuando el usuario adivina una letra.
     * @param {string} letter - La letra adivinada por el usuario.
     */
    function handleGuess(letter) {
        // Ignora si la letra ya ha sido usada
        if (guessedWord.includes(letter) || wrongLetters.includes(letter)) {
            return;
        }

        if (selectedWord.includes(letter)) {
            // La letra es correcta, actualiza la palabra adivinada
            for (let i = 0; i < selectedWord.length; i++) {
                if (selectedWord[i] === letter) {
                    guessedWord[i] = letter;
                }
            }
        } else {
            // La letra es incorrecta
            wrongLetters.push(letter);
            remainingGuesses--;
            // Muestra una parte del ahorcado por cada error, agregando la clase CSS
            if (6 - remainingGuesses - 1 >= 0 && 6 - remainingGuesses - 1 < hangmanParts.length) {
                hangmanParts[6 - remainingGuesses - 1].classList.add(hangmanClasses[6 - remainingGuesses - 1]);
            }
        }
        
        updateDisplay();
        checkGameStatus();
        
        // Deshabilita el botón de la letra usada
        const button = document.querySelector(`[data-letter="${letter}"]`);
        if (button) {
            button.disabled = true;
        }
    }

    /**
     * @function updateDisplay
     * @description Actualiza la interfaz de usuario con el estado actual del juego.
     */
    function updateDisplay() {
        wordDisplay.textContent = guessedWord.join(' ');
        wrongLettersDisplay.textContent = wrongLetters.join(', ').toUpperCase();
        remainingGuessesDisplay.textContent = remainingGuesses;
    }

    /**
     * @function checkGameStatus
     * @description Comprueba si el juego ha terminado.
     */
    function checkGameStatus() {
        if (guessedWord.join('') === selectedWord) {
            gameStatus.textContent = '¡Felicidades, has adivinado la palabra!';
            endGame();
        } else if (remainingGuesses === 0) {
            gameStatus.textContent = `¡Juego terminado! La palabra era: ${selectedWord.toUpperCase()}`;
            endGame();
        }
    }

    /**
     * @function endGame
     * @description Finaliza el juego y muestra el botón de reinicio.
     */
    function endGame() {
        keyboardContainer.style.display = 'none';
        restartButton.style.display = 'block';
    }

    // Event listener para el botón de reinicio
    restartButton.addEventListener('click', startGame);

    // Inicializa el juego al cargar la página
    startGame();
});
0