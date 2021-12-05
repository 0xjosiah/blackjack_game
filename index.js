const cardDeck = {
    '♠️': ['A',2,3,4,5,6,7,8,9,10,'J','Q','K'],
    '♣️': ['A',2,3,4,5,6,7,8,9,10,'J','Q','K'],
    '♥️': ['A',2,3,4,5,6,7,8,9,10,'J','Q','K'],
    '♦️': ['A',2,3,4,5,6,7,8,9,10,'J','Q','K']
}

function randCard (obj) {
    let card = []
    let suits = Object.keys(obj)
    let randSuit = suits[Math.floor(Math.random() * suits.length)]
    card.push(randSuit)
    let arr = obj[card[0]]
    card.unshift(arr[Math.floor(Math.random() * arr.length)])
    cardDeck[card[1]].splice(cardDeck[card[1]].indexOf(card[0]), 1)
    return card
}

let firstCardEl = document.getElementById('firstCard-el')
let secondCardEl = document.getElementById('secondCard-el')
let totalEl = document.getElementById('total-el')
let firstCard = []
let secondCard = []
let playerSum = 0
let statusOfPlayer = document.getElementById('player-status')

let dealerCardOne = []
let dealerCardTwo = []
let dcOneEl = document.getElementById('dcOne-el')
let dcTwoEl = document.getElementById('dcTwo-el')
let dealerSum = 0

function deal() {
    //deals cards
    firstCard = randCard(cardDeck)
    dealerCardOne = randCard(cardDeck)
    secondCard = randCard(cardDeck)
    dealerCardTwo = randCard(cardDeck)
    //appropriately shades player cards
    if (firstCard[1] === '♠️' || firstCard[1] === '♣️') {
        firstCardEl.style.color = 'black'
    } else {
        firstCardEl.style.color = 'red'
    }
    if (secondCard[1] === '♠️' || secondCard[1] === '♣️') {
        secondCardEl.style.color = 'black'
    } else {
        secondCardEl.style.color = 'red'
    }
    //prints player cards on screen
    firstCardEl.textContent = firstCard.join('')
    secondCardEl.textContent = secondCard.join('')
    //effectively adds player sum
    if (firstCard[0] === 'J' || firstCard[0] === 'Q' || firstCard[0] === 'K') {
        playerSum += 10
    } else if (firstCard[0] === 'A') {
        playerSum += 11
    } else {
        playerSum += firstCard[0]
    }
    if (secondCard[0] === 'J' || secondCard[0] === 'Q' || secondCard[0] === 'K') {
        playerSum += 10
    } else if (secondCard[0] === 'A') {
        playerSum += 11
    } else {
        playerSum += secondCard[0]
    }
    //prints player sum
    totalEl.textContent += playerSum
    //prints player status
    statusOfPlayer.textContent = playerStatus()
}


//appropriately shades dealer's cards
if (dealerCardOne[1] === '♠️' || dealerCardOne[1] === '♣️') {
    dcOneEl.style.color = 'black'
} else {
    dcOneEl.style.color = 'red'
}
if (dealerCardTwo[1] === '♠️' || dealerCardTwo[1] === '♣️') {
    dcTwoEl.style.color = 'black'
} else {
    dcTwoEl.style.color = 'red'
}

function getDealerCards() {
    //prints dealer cards
    dcOneEl.textContent = dealerCardOne.join('')
    dcTwoEl.textContent = dealerCardTwo.join('')
    //effectively adds dealer cards
    if (dealerCardOne[0] === 'J' || dealerCardOne[0] === 'Q' || dealerCardOne[0] === 'K') {
        dealerSum += 10
    } else if (dealerCardOne[0] === 'A') {
        dealerSum += 11
    } else {
        dealerSum += dealerCardOne[0]
    }
    if (dealerCardTwo[0] === 'J' || dealerCardTwo[0] === 'Q' || dealerCardTwo[0] === 'K') {
        dealerSum += 10
    } else if (dealerCardTwo[0] === 'A') {
        dealerSum += 11
    } else {
        dealerSum += dealerCardTwo[0]
    }
    //prints final result
    document.getElementById('roundResult-el').textContent = result()
}

let hitCardEl = document.getElementById('hitCard-el')

function addCard() {
    document.getElementById('hitCard').style.visibility = 'visible'
    let addedCard = randCard(cardDeck)
    if (addedCard[1] === '♠️' || addedCard[1] === '♣️') {
        hitCardEl.style.color = 'black'
    } else {
        hitCardEl.style.color = 'red'
    }
    hitCardEl.textContent = addedCard.join('')
    if (addedCard[0] === 'A' && playerSum < 11) {
        playerSum += 11
    } else if (addedCard[0] === 'A' && playerSum > 11) {
        playerSum += 1
    } else if (addedCard[0] === 'J' || addedCard[0] === 'Q' || addedCard[0] === 'K') {
        playerSum += 10
    } else {
        playerSum += addedCard[0]
    }
    totalEl.textContent =  `Total: ${playerSum}`
    statusOfPlayer.textContent = playerStatus(playerSum)
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
// obviously can't bet
// have to follow general black jack rules - can't try to break it
// have to reload page to deal a new hand
//dealer doesn't hit until win/bust if card sum is below player's