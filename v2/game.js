class MemoryGame {
    constructor() {
        this.board = document.getElementById('gameBoard');
        this.movesElement = document.getElementById('moves');
        this.timerElement = document.getElementById('timer');
        this.pairsElement = document.getElementById('pairs');
        this.bestScoreElement = document.getElementById('bestScore');
        this.newGameBtn = document.getElementById('newGameBtn');
        this.resetBestBtn = document.getElementById('resetBestBtn');
        this.winMessage = document.getElementById('winMessage');
        this.winMovesElement = document.getElementById('winMoves');
        this.winTimeElement = document.getElementById('winTime');
        this.winBestScoreElement = document.getElementById('winBestScore');
        this.winNewGameBtn = document.getElementById('winNewGameBtn');
        this.sizeButtons = document.querySelectorAll('.size-btn');
        
        this.cards = [];
        this.flippedCards = [];
        this.moves = 0;
        this.matchedPairs = 0;
        this.canFlip = true;
        this.gameStarted = false;
        this.gameFinished = false;
        this.timerInterval = null;
        this.seconds = 0;
        this.boardSize = '4x4';
        this.totalPairs = 8;
        
        this.symbols4x4 = ['🍎', '🍌', '🍒', '🍇', '🍊', '🍓', '🍉', '🥝'];
        this.symbols6x6 = ['🍎', '🍌', '🍒', '🍇', '🍊', '🍓', '🍉', '🥝', '🍍', '🥑', '🌶️', '🥦', '🍋', '🥭', '🫐', '🍑', '🍈', '🥥'];
        
        this.init();
    }
    
    init() {
        this.loadBestScore();
        this.createCards();
        this.shuffleCards();
        this.renderBoard();
        this.setupEventListeners();
        this.updateBestScoreDisplay();
    }
    
    createCards() {
        this.cards = [];
        const symbols = this.boardSize === '4x4' ? this.symbols4x4 : this.symbols6x6;
        this.totalPairs = symbols.length;
        const cardValues = [...symbols, ...symbols];
        
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
        this.board.className = 'game-board';
        
        if (this.boardSize === '6x6') {
            this.board.classList.add('size-6x6');
        }
        
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
            if (!cardElement || !this.canFlip || this.gameFinished) return;
            
            if (!this.gameStarted) {
                this.startGame();
            }
            
            const cardId = parseInt(cardElement.dataset.id);
            this.flipCard(cardId);
        });
        
        this.newGameBtn.addEventListener('click', () => {
            this.resetGame();
        });
        
        this.resetBestBtn.addEventListener('click', () => {
            this.resetBestScore();
        });
        
        this.winNewGameBtn.addEventListener('click', () => {
            this.winMessage.classList.remove('show');
            this.resetGame();
        });
        
        this.sizeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const size = btn.dataset.size;
                this.changeBoardSize(size);
            });
        });
    }
    
    startGame() {
        this.gameStarted = true;
        this.startTimer();
    }
    
    startTimer() {
        this.seconds = 0;
        this.updateTimerDisplay();
        
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        
        this.timerInterval = setInterval(() => {
            this.seconds++;
            this.updateTimerDisplay();
        }, 1000);
    }
    
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
    
    updateTimerDisplay() {
        const minutes = Math.floor(this.seconds / 60);
        const remainingSeconds = this.seconds % 60;
        this.timerElement.textContent = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
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
            this.pairsElement.textContent = `${this.matchedPairs}/${this.totalPairs}`;
            
            if (this.matchedPairs === this.totalPairs) {
                this.finishGame();
            }
        } else {
            card1.flipped = false;
            card2.flipped = false;
        }
        
        this.flippedCards = [];
        this.canFlip = true;
        this.renderBoard();
    }
    
    finishGame() {
        this.gameFinished = true;
        this.stopTimer();
        this.checkBestScore();
        this.showWinMessage();
    }
    
    showWinMessage() {
        this.winMovesElement.textContent = this.moves;
        this.winTimeElement.textContent = this.timerElement.textContent;
        this.winBestScoreElement.textContent = this.getBestScoreDisplay();
        
        setTimeout(() => {
            this.winMessage.classList.add('show');
        }, 500);
    }
    
    loadBestScore() {
        const saved = localStorage.getItem(`memoryGameBestScore_${this.boardSize}`);
        if (saved) {
            this.bestScore = JSON.parse(saved);
        } else {
            this.bestScore = null;
        }
    }
    
    saveBestScore() {
        localStorage.setItem(`memoryGameBestScore_${this.boardSize}`, JSON.stringify(this.bestScore));
    }
    
    checkBestScore() {
        const currentScore = {
            moves: this.moves,
            time: this.seconds,
            date: new Date().toISOString()
        };
        
        if (!this.bestScore || 
            currentScore.moves < this.bestScore.moves || 
            (currentScore.moves === this.bestScore.moves && currentScore.time < this.bestScore.time)) {
            this.bestScore = currentScore;
            this.saveBestScore();
            this.updateBestScoreDisplay();
        }
    }
    
    updateBestScoreDisplay() {
        this.bestScoreElement.textContent = this.getBestScoreDisplay();
    }
    
    getBestScoreDisplay() {
        if (!this.bestScore) return '-';
        const minutes = Math.floor(this.bestScore.time / 60);
        const seconds = this.bestScore.time % 60;
        return `${this.bestScore.moves} ходов, ${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    
    resetBestScore() {
        this.bestScore = null;
        localStorage.removeItem(`memoryGameBestScore_${this.boardSize}`);
        this.updateBestScoreDisplay();
    }
    
    changeBoardSize(size) {
        if (size === this.boardSize) return;
        
        this.sizeButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.size === size) {
                btn.classList.add('active');
            }
        });
        
        this.boardSize = size;
        this.loadBestScore();
        this.resetGame();
    }
    
    resetGame() {
        this.cards = [];
        this.flippedCards = [];
        this.moves = 0;
        this.matchedPairs = 0;
        this.canFlip = true;
        this.gameStarted = false;
        this.gameFinished = false;
        this.seconds = 0;
        
        this.movesElement.textContent = '0';
        this.timerElement.textContent = '0:00';
        this.pairsElement.textContent = `0/${this.totalPairs}`;
        
        this.stopTimer();
        
        this.createCards();
        this.shuffleCards();
        this.renderBoard();
        this.updateBestScoreDisplay();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MemoryGame();
});