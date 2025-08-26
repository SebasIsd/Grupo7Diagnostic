document.addEventListener('DOMContentLoaded', () => {
    // Definimos las cartas que se utilizarán en el juego
    // Cada carta tiene un nombre y una URL de imagen o una clase de ícono (ej. Font Awesome)
    const cardsArray = [
        { name: 'bomb', icon: 'fas fa-bomb' },
        { name: 'bolt', icon: 'fas fa-bolt' },
        { name: 'cloud', icon: 'fas fa-cloud' },
        { name: 'coffee', icon: 'fas fa-mug-hot' },
        { name: 'heart', icon: 'fas fa-heart' },
        { name: 'star', icon: 'fas fa-star' },
        { name: 'music', icon: 'fas fa-music' },
        { name: 'moon', icon: 'fas fa-moon' },
    ];

    // Duplicamos el array para tener pares de cartas
    const gameCards = [...cardsArray, ...cardsArray];

    const gameContainer = document.getElementById('memory-game');
    const gameStatus = document.getElementById('game-status');
    
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matchesFound = 0;

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
    }

    /**
     * @function createBoard
     * @description Genera dinámicamente el tablero del juego a partir del array de cartas.
     */
    function createBoard() {
        shuffleCards(gameCards);
        gameCards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.name = card.name;
            
            // Cara frontal de la carta
            const frontFace = document.createElement('div');
            frontFace.classList.add('front-face');
            const frontIcon = document.createElement('i');
            frontIcon.className = card.icon;
            frontFace.appendChild(frontIcon);

            // Cara trasera de la carta
            const backFace = document.createElement('div');
            backFace.classList.add('back-face');
            backFace.innerHTML = `<i class="fas fa-question"></i>`;
            
            cardElement.appendChild(frontFace);
            cardElement.appendChild(backFace);
            
            cardElement.addEventListener('click', flipCard);
            gameContainer.appendChild(cardElement);
        });
    }

    /**
     * @function flipCard
     * @description Maneja la lógica de voltear una carta al hacer clic.
     */
    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
            // Primera carta volteada
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        // Segunda carta volteada
        secondCard = this;
        checkForMatch();
    }

    /**
     * @function checkForMatch
     * @description Comprueba si las dos cartas volteadas coinciden.
     */
    function checkForMatch() {
        const isMatch = firstCard.dataset.name === secondCard.dataset.name;
        isMatch ? disableCards() : unflipCards();
    }

    /**
     * @function disableCards
     * @description Desactiva las cartas que coinciden, evitando que se vuelvan a voltear.
     */
    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        
        matchesFound++;
        if (matchesFound === cardsArray.length) {
            // Condición de victoria
            gameStatus.textContent = '¡Felicidades, has encontrado todos los pares!';
        }

        resetBoard();
    }

    /**
     * @function unflipCards
     * @description Voltea las cartas si no coinciden.
     */
    function unflipCards() {
        lockBoard = true;
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
    
    // Inicia el juego
    createBoard();
});
