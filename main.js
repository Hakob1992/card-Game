

class Match {
    constructor(cards) {
        this.cardsArray = cards;
        this.ticker = document.getElementById('flips');
    }

    startGame() {
        this.cardToCheck = null;
        this.clicks = 0;
        this.matchedCards = [];
        this.busy = true;

        setTimeout(() => {
            this.shuffleCards();
            this.busy = false;
        }, 500);
        this.hideCards();
        this.ticker.innerText = this.clicks;

    }

    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('show');
            card.classList.remove('matched');
        })
    }

    flipCard(card) {
        if (this.canFlipCard(card)) {

            card.classList.add('show');


            if (this.cardToCheck) {
                this.checkForCardMatch(card);
                this.clicks++;
                this.ticker.innerText = this.clicks;
            } else
                this.cardToCheck = card;
        }
    }

    checkForCardMatch(card) {
        if (this.getCardType(card) === this.getCardType(this.cardToCheck)) {
            this.cardMatch(card, this.cardToCheck);
        } else {
            this.cardMissMatch(card, this.cardToCheck);
        }

        this.cardToCheck = null;
    }

    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        if (this.matchedCards.length === this.cardsArray) {
            alert('win!')
        }
    }

    cardMissMatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('show');
            card2.classList.remove('show');
            this.busy = false;
        }, 1000);
    }

    getCardType(card) {
        return card.getElementsByClassName('card-value')[0].src;
    }

    shuffleCards() {
        for (let i = this.cardsArray.length - 1; i > 0; i--) {
            let rendIndex = Math.floor(Math.random() * (i + 1));
            this.cardsArray[rendIndex].style.order = i;
            this.cardsArray[i].style.order = rendIndex;
        }
    }

    canFlipCard(card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }
}

function ready() {
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new Match(cards);
    game.startGame();

    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}


