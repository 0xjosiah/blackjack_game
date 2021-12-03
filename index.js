
function randomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
let firstCardEl = document.getElementById('firstCard-el')
let secondCardEl = document.getElementById('secondCard-el')
let totalEl = document.getElementById('total-el')
let firstCard = randomNum(2, 11)
let secondCard = randomNum(2, 11)
let playerSum = firstCard + secondCard
let statusOfPlayer = document.getElementById('player-status')

const cardDeck = {
    'spades': ['A',2,3,4,5,6,7,8,9,10,'J','Q','K'],
    'clubs': ['A',2,3,4,5,6,7,8,9,10,'J','Q','K'],
    'hearts': ['A',2,3,4,5,6,7,8,9,10,'J','Q','K'],
    'diamonds': ['A',2,3,4,5,6,7,8,9,10,'J','Q','K']
}

const playerHand = {
  'cardOne': [],
  'cardTwo': [],
}

function randCard () {
  let suits = Object.keys(cardDeck)
  let suit = suits[Math.floor(Math.random() * suits.length)]
  let suitDeck = cardDeck[suits[Math.floor(Math.random() * suits.length)]]
  let card = suitDeck[Math.floor(Math.random() * suitDeck.length)]
  return card
}

function deal() {
    if (firstCard === 11) {
        firstCardEl.textContent = 'A'
    } else {
        firstCardEl.textContent = firstCard
    }
    if (secondCard === 11) {
        secondCardEl.textContent = 'A'
    } else {
        secondCardEl.textContent = secondCard
    }
    totalEl.textContent += playerSum
    statusOfPlayer.textContent = playerStatus()
}

let dealerCardOne = randomNum(2, 11)
let dealerCardTwo = randomNum(2, 11)
let dcOneEl = document.getElementById('dcOne-el')
let dcTwoEl = document.getElementById('dcTwo-el')
let dealerSum = dealerCardTwo + dealerCardOne


function getDealerCards() {
    if (dealerCardOne === 11) {
        dcOneEl.textContent = 'A'
    } else {
        dcOneEl.textContent = dealerCardOne
    }
    if (dealerCardTwo === 11) {
        dcTwoEl.textContent = 'A'
    } else {
        dcTwoEl.textContent = dealerCardTwo
    }
    document.getElementById('roundResult-el').textContent = result()
}

function addCard() {
    document.getElementById('hitCard').style.visibility = 'visible'
    let addedCard = randomNum(2,11)
    if (addedCard === 11 && playerSum < 11) {
        playerSum += addedCard
        totalEl.textContent = 'Total: ' + playerSum
        statusOfPlayer.textContent = playerStatus(playerSum)
        document.getElementById('hitCard-el').textContent = 'A'
    } else if (addedCard === 11 && playerSum > 11) {
        playerSum += 1
        totalEl.textContent = 'Total: ' + playerSum
        statusOfPlayer.textContent = playerStatus(playerSum)
        document.getElementById('hitCard-el').textContent = 'A'
    } else {
        playerSum += addedCard
        totalEl.textContent = 'Total: ' + playerSum
        statusOfPlayer.textContent = playerStatus(playerSum)
        document.getElementById('hitCard-el').textContent = addedCard
    }
    if (isBusted(playerSum)) {
        return bustedMessage()
    }
}

function isBusted(sum) {
    if (sum < 21) {
        return false;
    } else if (sum === 21) {
        return false;
    } else {
        return true;
    }
}

function bustedMessage() {
    document.getElementById('roundResult-el').textContent = 'hahahah what a loser!'
}

function isBlackjack(sum) {
    if (sum === 21) {
        return true;
    } else {
        return false;
    }
}

function playerStatus() {
    if (isBusted(playerSum)) {
        return "Busted!"
    } else if (isBlackjack(playerSum)) {
        return "Congrats! You have Blackjack!"
    } else {
        return "Do you want to hit or stay?"
    }
}

function result() {
    if (isBusted(playerSum)) {
        return bustedMessage()
    } else if (playerSum < dealerSum) {
        return 'You lose! You f*cking loser!'
    } else if (playerSum > dealerSum && !isBusted(playerSum)) {
        return 'Wow, you win!'
    } else if (playerSum === dealerSum) {
        return 'draw'
    } else {
        return 'this ain\'t it chief'
    }
}

function reset() {
    return location.reload();
}


console.log(`are you busted? ${isBusted()}`)
console.log(`do you have blackjack? ${isBlackjack()}`)
console.log(playerStatus())


// LIMITATIONS:
// not true odds as the full deck is not filled out (i.e. no face cards, no suits)
// this applies to both dealer and players. 
// as a result you can get two '11' cards for instance
// obviously can't bet
// have to follow general black jack rules - can't try to break it
// have to reload page to deal a new hand