class MemoryGame {
    constructor() {
        this.board = document.getElementById('gameBoard');
        this.movesElement = document.getElementById('moves');
        this.pairsElement = document.getElementById('pairs');
        this.newGameBtn = document.getElementById('newGameBtn');
        this.winMessage = document.getElementById('winMessage');
        this.winMovesElement = document.getElementById('winMoves');
        this.winNewGameBtn = document.getElementById('winNewGameBtn');
        
        this.cards = [];
        this.flippedCards = [];
        this.moves = 0;
        this.matchedPairs = 0;
        this.canFlip = true;
        
        this.symbols = ['🍎', '🍌', '🍒', '🍇', '🍊', '🍓', '🍉', '🥝'];
        
        this.init();
    }
    
    init() {
        this.createCards();
        this.shuffleCards();
        this.renderBoard();
        this.setupEventListeners();
    }
    
    createCards() {
        this.cards = [];
        const cardValues = [...this.symbols, ...this.symbols];
        
        cardValues.forEach((value, index) => {
            this.cards.push({
                id: index,
                value: value,
                flipped: false,
                matched: false
            });
        });
    }
    
    shuffleCards() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
    
    renderBoard() {
        this.board.innerHTML = '';
        
        this.cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            if (card.flipped || card.matched) {
                cardElement.classList.add('flipped');
            }
            if (card.matched) {
                cardElement.classList.add('matched');
            }
            
            cardElement.dataset.id = card.id;
            
            const cardFront = document.createElement('div');
            cardFront.className = 'card-front';
            cardFront.textContent = card.value;
            
            const cardBack = document.createElement('div');
            cardBack.className = 'card-back';
            
            cardElement.appendChild(cardFront);
            cardElement.appendChild(cardBack);
            
            this.board.appendChild(cardElement);
        });
    }
    
    setupEventListeners() {
        this.board.addEventListener('click', (e) => {
            const cardElement = e.target.closest('.card');
            if (!cardElement || !this.canFlip) return;
            
            const cardId = parseInt(cardElement.dataset.id);
            this.flipCard(cardId);
        });
        
        this.newGameBtn.addEventListener('click', () => {
            this.resetGame();
        });
        
        this.winNewGameBtn.addEventListener('click', () => {
            this.winMessage.classList.remove('show');
            this.resetGame();
        });
    }
    
    flipCard(cardId) {
        const card = this.cards.find(c => c.id === cardId);
        
        if (!card || card.flipped || card.matched || this.flippedCards.length >= 2 || !this.canFlip) {
            return;
        }
        
        card.flipped = true;
        this.flippedCards.push(card);
        
        this.renderBoard();
        
        if (this.flippedCards.length === 2) {
            this.moves++;
            this.movesElement.textContent = this.moves;
            
            this.canFlip = false;
            
            setTimeout(() => {
                this.checkMatch();
            }, 1000);
        }
    }
    
    checkMatch() {
        const [card1, card2] = this.flippedCards;
        
        if (card1.value === card2.value) {
            card1.matched = true;
            card2.matched = true;
            this.matchedPairs++;
            this.pairsElement.textContent = `${this.matchedPairs}/8`;
            
            if (this.matchedPairs === 8) {
                this.showWinMessage();
            }
        } else {
            card1.flipped = false;
            card2.flipped = false;
        }
        
        this.flippedCards = [];
        this.canFlip = true;
        this.renderBoard();
    }
    
    showWinMessage() {
        this.winMovesElement.textContent = this.moves;
        setTimeout(() => {
            this.winMessage.classList.add('show');
        }, 500);
    }
    
    resetGame() {
        this.cards = [];
        this.flippedCards = [];
        this.moves = 0;
        this.matchedPairs = 0;
        this.canFlip = true;
        
        this.movesElement.textContent = '0';
        this.pairsElement.textContent = '0/8';
        
        this.createCards();
        this.shuffleCards();
        this.renderBoard();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MemoryGame();
});