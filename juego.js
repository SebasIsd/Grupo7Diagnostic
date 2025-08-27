document.addEventListener('DOMContentLoaded', () => {
    // Definimos las cartas que se utilizarán en el juego
    const cardsArray = [
        { name: 'bomb', icon: 'fas fa-bomb' },
        { name: 'bolt', icon: 'fas fa-bolt' },
        { name: 'cloud', icon: 'fas fa-cloud' },
        { name: 'coffee', icon: 'fas fa-mug-hot' },
        { name: 'heart', icon: 'fas fa-heart' },
        { name: 'star', icon: 'fas fa-star' },
        { name: 'music', icon: 'fas fa-music' },
        { name: 'moon', icon: 'fas fa-moon' },
        { name: 'bug', icon: 'fas fa-bug' },
        { name: 'crown', icon: 'fas fa-crown' },
        { name: 'lightbulb', icon: 'fas fa-lightbulb' },
        { name: 'rocket', icon: 'fas fa-rocket' },
        { name: 'sun', icon: 'fas fa-sun' },
        { name: 'gem', icon: 'fas fa-gem' },
        { name: 'leaf', icon: 'fas fa-leaf' },
        { name: 'snowflake', icon: 'fas fa-snowflake' }
    ];

    const gameContainer = document.getElementById('memory-game');
    const gameStatus = document.getElementById('game-status');
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');
    const difficultySelect = document.getElementById('difficulty-select');

    let gameCards = [];
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matchesFound = 0;
    let totalCards;
    let gameActive = false;

    /**
     * @function shuffleCards
     * @description Mezcla aleatoriamente el array de cartas.
     * @param {Array} array - El array de cartas a mezclar.
     */
    function shuffleCards(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    /**
     * @function createBoard
     * @description Genera las tarjetas del juego en el DOM.
     * @param {Array} cards - El array de cartas a mostrar.
     */
    function createBoard(cards) {
        gameContainer.innerHTML = '';
        cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('memory-card');
            cardElement.dataset.name = card.name;
            
            const frontFace = document.createElement('div');
            frontFace.classList.add('front-face');
            frontFace.innerHTML = `<i class="${card.icon}"></i>`;
            
            const backFace = document.createElement('div');
            backFace.classList.add('back-face');
            backFace.innerHTML = `<i class="fas fa-question"></i>`;

            cardElement.appendChild(frontFace);
            cardElement.appendChild(backFace);
            
            cardElement.addEventListener('click', flipCard);
            gameContainer.appendChild(cardElement);
        });
        
        // Ajustar el tamaño de la cuadrícula según la dificultad
        if (totalCards === 8) {
            gameContainer.style.gridTemplateColumns = 'repeat(4, 1fr)';
        } else if (totalCards === 12) {
            gameContainer.style.gridTemplateColumns = 'repeat(4, 1fr)';
        } else if (totalCards === 16) {
            gameContainer.style.gridTemplateColumns = 'repeat(4, 1fr)';
        }
    }

    /**
     * @function startGame
     * @description Inicializa el juego según la dificultad seleccionada.
     */
    function startGame() {
        const difficulty = difficultySelect.value;
        let numPairs;
        if (difficulty === 'easy') {
            numPairs = 4;
        } else if (difficulty === 'medium') {
            numPairs = 6;
        } else {
            numPairs = 8;
        }
        
        totalCards = numPairs * 2;
        matchesFound = 0;
        
        // Aplicar clase de dificultad al contenedor principal
        document.querySelector('main').className = `container difficulty-${difficulty}`;
        
        const selectedCards = cardsArray.slice(0, numPairs);
        gameCards = [...selectedCards, ...selectedCards];
        gameCards = shuffleCards(gameCards);
        createBoard(gameCards);
        
        gameStatus.textContent = '¡Juego iniciado! Encuentra todos los pares.';
        restartButton.style.display = 'none';
        startButton.style.display = 'none';
        gameActive = true;
        
        // Deshabilitar el selector de dificultad durante el juego
        difficultySelect.disabled = true;
    }

    /**
     * @function resetGame
     * @description Reinicia el juego al estado inicial
     */
    function resetGame() {
        gameContainer.innerHTML = '';
        gameStatus.textContent = 'Selecciona una dificultad y haz clic en Iniciar Juego.';
        restartButton.style.display = 'none';
        startButton.style.display = 'block';
        difficultySelect.disabled = false;
        gameActive = false;
        
        // Limpiar variables del juego
        hasFlippedCard = false;
        lockBoard = false;
        firstCard = null;
        secondCard = null;
        matchesFound = 0;
    }

    /**
     * @function flipCard
     * @description Voltea una carta al hacer clic en ella.
     */
    function flipCard() {
        if (!gameActive) return;
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    /**
     * @function checkForMatch
     * @description Comprueba si las dos cartas volteadas coinciden.
     */
    function checkForMatch() {
        lockBoard = true;
        const isMatch = firstCard.dataset.name === secondCard.dataset.name;
        
        if (isMatch) {
            disableCards();
        } else {
            unflipCards();
        }
    }

    /**
     * @function disableCards
     * @description Desactiva las cartas que coinciden, evitando que se vuelvan a voltear.
     */
    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        
        matchesFound++;
        if (matchesFound * 2 === totalCards) {
            gameStatus.textContent = '¡Felicidades, has encontrado todos los pares!';
            restartButton.style.display = 'block';
            gameActive = false;
        }

        resetBoard();
    }

    /**
     * @function unflipCards
     * @description Voltea las cartas si no coinciden.
     */
    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1000);
    }

    /**
     * @function resetBoard
     * @description Reinicia las variables del tablero para el próximo turno.
     */
    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    /**
     * @function confirmDifficultyChange
     * @description Muestra confirmación al cambiar dificultad durante el juego
     */
    function confirmDifficultyChange() {
        if (gameActive) {
            if (confirm('¿Estás seguro de que quieres cambiar la dificultad? Esto reiniciará el juego actual.')) {
                resetGame();
            } else {
                // Revertir al valor anterior
                difficultySelect.value = getCurrentDifficulty();
            }
        }
    }

    /**
     * @function getCurrentDifficulty
     * @description Obtiene la dificultad actual basada en el número de pares
     */
    function getCurrentDifficulty() {
        if (totalCards === 8) return 'easy';
        if (totalCards === 12) return 'medium';
        if (totalCards === 16) return 'hard';
        return 'easy'; // Valor por defecto
    }

    // Event listeners para los botones
    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', startGame);

    // Event listener para cambios en la dificultad
    difficultySelect.addEventListener('change', confirmDifficultyChange);

    // Inicializar el juego al cargar la página
    resetGame();
});