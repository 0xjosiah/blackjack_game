
function randomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
const cardDeck = {
    'spades': ['A',2,3,4,5,6,7,8,9,10,'J','Q','K'],
    'clubs': ['A',2,3,4,5,6,7,8,9,10,'J','Q','K'],
    'hearts': ['A',2,3,4,5,6,7,8,9,10,'J','Q','K'],
    'diamonds': ['A',2,3,4,5,6,7,8,9,10,'J','Q','K']
}
let firstCardEl = document.getElementById('firstCard-el')
let secondCardEl = document.getElementById('secondCard-el')
let totalEl = document.getElementById('total-el')
let firstCard = randCard(cardDeck)
let secondCard = randCard(cardDeck)
let playerSum = 0
let statusOfPlayer = document.getElementById('player-status')


const playerHand = {
  'cardOne': [],
  'cardTwo': [],
}

function randCard (obj) {
    let keys = Object.keys(obj)
    let key = keys[Math.floor(Math.random() * keys.length)]
    let arr = obj[keys[Math.floor(Math.random() * keys.length)]]
    let card = arr[Math.floor(Math.random() * arr.length)]
    return card
  }

function deal() {
    firstCardEl.textContent = firstCard
    secondCardEl.textContent = secondCard
    if (firstCard === 'J' || firstCard === 'Q' || firstCard === 'K') {
        playerSum += 10
    } else if (firstCard === 'A') {
        playerSum += 11
    } else {
        playerSum += firstCard
    }
    if (secondCard === 'J' || secondCard === 'Q' || secondCard === 'K') {
        playerSum += 10
    } else if (secondCard === 'A') {
        playerSum += 11
    } else {
        playerSum += secondCard
    }
    totalEl.textContent += playerSum
    statusOfPlayer.textContent = playerStatus()
}

let dealerCardOne = randCard(cardDeck)
let dealerCardTwo = randCard(cardDeck)
let dcOneEl = document.getElementById('dcOne-el')
let dcTwoEl = document.getElementById('dcTwo-el')
let dealerSum = 0


function getDealerCards() {
    dcOneEl.textContent = dealerCardOne
    dcTwoEl.textContent = dealerCardTwo
    if (dealerCardOne === 'J' || dealerCardOne === 'Q' || dealerCardOne === 'K') {
        dealerSum += 10
    } else if (dealerCardOne === 'A') {
        dealerSum += 11
    } else {
        dealerSum += dealerCardOne
    }
    if (dealerCardTwo === 'J' || dealerCardTwo === 'Q' || dealerCardTwo === 'K') {
        dealerSum += 10
    } else if (dealerCardTwo === 'A') {
        dealerSum += 11
    } else {
        dealerSum += dealerCardTwo
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