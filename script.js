import Deck from './deck.js'

const CARD_VALUE_MAP = {
    "2" : 2,
    "3" : 3,
    "4" : 4,
    "5" : 5,
    "6" : 6,
    "7" : 7,
    "8" : 8,
    "9" : 9,
    "10" : 10,
    "J" : 11,
    "Q" : 12,
    "K" : 13,
    "A" : 14
}

const computerCardSlot = document.querySelector('.computer-card-slot')
const playerCardSlot = document.querySelector('.player-card-slot')
const computerDeckElement = document.querySelector('.computer-deck')
const playerDeckElement = document.querySelector('.player-deck')
const text = document.querySelector('.text')

let playerDeck, computerDeck, inRound, stop

document.addEventListener('click', () => {

    if (stop) {
        startGame()
        return 
    }

    if (inRound) {
        cleanBeforeRound()
    }
    else {
        flipCards()
    }
})

startGame ()
function startGame() {  
const deck = new Deck()
deck.shuffle()

const deckMidpoint = Math.ceil(deck.numberOfCards/2)   // dividing deck into 2 equal parts    // math.ceil to aviod ans in decimals
playerDeck = new Deck(deck.cards.slice(0,deckMidpoint))             // this will hold cards from 0 to midpoint
computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards)) 
inRound = false
stop = false

cleanBeforeRound()

}

function cleanBeforeRound(){                // in this function computer deck and player deck as blank
    inRound = false                                 
    computerCardSlot.innerHTML = ''
    playerCardSlot.innerHTML = ''
    text.innerText = ''

    updateDeckCount ()
}

function flipCards() {
    inRound = true

    const playerCard = playerDeck.pop()                 // this will pop the first card from player deck
    const computerCard = computerDeck.pop()             // this will pop the first card from computer deck

    playerCardSlot.appendChild(playerCard.getHTML())
    computerCardSlot.appendChild(computerCard.getHTML())

    updateDeckCount()


    if (isRoundWinner(playerCard, computerCard)) {       // if player won the round then both the cards will moved to the bottom of players deck
        text.innerText = "Win"
        playerDeck.push(playerCard)
        playerDeck.push(computerCard)
    }
    else if (isRoundWinner(computerCard, playerCard)) {
        text.innerText = "Lose"
        computerDeck.push(playerCard)
        computerDeck.push(computerCard)
    }
    else{
        text.innerText  =  "Draw"
        computerDeck.push(computerCard)
        playerDeck.push(playerCard)
    }

    if (isGameOver(playerDeck)){
        text.innerText = "you lose !!!"
        stop = true                             // to stop the game after win or lose
    }
    else if (isGameOver(computerDeck)){
        text.innerText = "you Win"
        stop = true
    }
}
function updateDeckCount(){
    computerDeckElement.innerText = computerDeck.numberOfCards
    playerDeckElement.innerText = playerDeck.numberOfCards
}

function isRoundWinner (cardOne, cardTow) {         // fuction used to see winner of rounds in card one and two
    return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTow.value]     // the card highest value win the round
}

function isGameOver(deck) {
    return deck.numberOfCards === 0
}
