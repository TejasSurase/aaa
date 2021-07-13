// variables are in caps to show global constant variable
const SUITS = ["♣", "♦", "♥", "♠"]
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

// created deck class to represent a deck of class
export default class Deck{
    constructor(cards = freshDeck()) {
        this.cards=cards
    }

    get numberOfCards(){
        return this.cards.length
    }

    pop() {
        return this.cards.shift()           // shift will return top element //pop will return last element
    }

    push (card) {
        this.cards.push(card)
    }

    shuffle(){
        for (let i= this.numberOfCards - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i+1))
            const oldValue = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldValue
        }
    }
}

// to represent suit of card and value of card
class Card {
    constructor(suit, value){
        this.suit=suit;
        this.value=value;
    }

// its used to return the color of card depending upon the suit of class
get color() {
    return this.suit === '♣' || this.suit === '♠' ? 'black' : 'red'
}

// to return html element
getHTML() {
    const cardDiv = document.createElement("div")
    cardDiv.innerText = this.suit
    cardDiv.classList.add("card", this.color)  
    cardDiv.dataset.value = `${this.value} ${this.suit}`
    return cardDiv      // this will return the value and suit of card
}
}

// to create brand new deck of all 52 cards
function freshDeck () {
    return SUITS.flatMap(suit =>{           // to combine each suit with each value
        return VALUES.map(value => {        // within a array, so we used flatmap and map function.
            return new Card(suit,value)     // now by using this above function we are getting a each suit with diff diff value within a aray.
        })
    })
}
