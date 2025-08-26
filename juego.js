document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('game-form');
    const guessInput = document.getElementById('guess');
    const resultMessage = document.getElementById('result-message');
    const remainingGuesses = document.getElementById('remaining-guesses');
    
    let secretNumber = Math.floor(Math.random() * 100) + 1;
    let guessesLeft = 10;

    remainingGuesses.textContent = `Intentos restantes: ${guessesLeft}`;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (guessesLeft === 0) {
            resultMessage.textContent = '¡Se acabaron los intentos! El número era ' + secretNumber;
            resultMessage.style.color = '#D32F2F'; // Rojo
            guessInput.disabled = true;
            return;
        }

        const userGuess = parseInt(guessInput.value);

        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            resultMessage.textContent = 'Por favor, ingresa un número válido entre 1 y 100.';
            resultMessage.style.color = '#FFC107'; // Amarillo
            return;
        }

        guessesLeft--;

        if (userGuess === secretNumber) {
            resultMessage.textContent = `¡Felicidades! Adivinaste el número en ${10 - guessesLeft} intentos.`;
            resultMessage.style.color = '#4CAF50'; // Verde
            guessInput.disabled = true;
        } else if (userGuess < secretNumber) {
            resultMessage.textContent = 'Muy bajo. Intenta con un número más alto.';
            resultMessage.style.color = '#2196F3'; // Azul
        } else {
            resultMessage.textContent = 'Muy alto. Intenta con un número más bajo.';
            resultMessage.style.color = '#2196F3'; // Azul
        }

        remainingGuesses.textContent = `Intentos restantes: ${guessesLeft}`;
        guessInput.value = '';
    });
});