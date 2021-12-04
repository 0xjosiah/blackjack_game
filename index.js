const spade = '♠️'
const club = '♣️'
const heart = '♥️'
const diamond = '♦️'

const cardDeck = {
    'spades': ['A',2,3,4,5,6,7,8,9,10,'J','Q','K'],
    'clubs': ['A',2,3,4,5,6,7,8,9,10,'J','Q','K'],
    'hearts': ['A',2,3,4,5,6,7,8,9,10,'J','Q','K'],
    'diamonds': ['A',2,3,4,5,6,7,8,9,10,'J','Q','K']
}
function randCard (obj) {
    let card = []
    let keys = Object.keys(obj)
    let key = keys[Math.floor(Math.random() * keys.length)]
    // console.log(key)
    // console.log(obj[key])
    let arr = obj[key]
    // console.log(arr)
    card.push(arr[Math.floor(Math.random() * arr.length)])
    if (key === 'spades') {
        card.push(spade)
    } else if (key === 'club') {
        card.push(club)
    } else if (key === 'heart') {
        card.push(heart)
    } else {
        card.push(diamond)
    }
    arr.splice(card[0], 1)
    console.log(cardDeck)
    return card
//somthing isnt right here
}

let firstCardEl = document.getElementById('firstCard-el')
let secondCardEl = document.getElementById('secondCard-el')
let totalEl = document.getElementById('total-el')
let firstCard = randCard(cardDeck)
let secondCard = randCard(cardDeck)
let playerSum = 0
let statusOfPlayer = document.getElementById('player-status')



function dealtCard (arr, value) {
    let index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
}

if (firstCard[1] === spade || firstCard[1] === club) {
    firstCardEl.style.color = 'black'
} else {
    firstCardEl.style.color = 'red'
}

if (secondCard[1] === spade || secondCard[1] === club) {
    secondCardEl.style.color = 'black'
} else {
    secondCardEl.style.color = 'red'
}

function deal() {
    firstCardEl.textContent = firstCard.join('')
    secondCardEl.textContent = secondCard.join('')
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
    totalEl.textContent += playerSum
    statusOfPlayer.textContent = playerStatus()
}

let dealerCardOne = randCard(cardDeck)
let dealerCardTwo = randCard(cardDeck)
let dcOneEl = document.getElementById('dcOne-el')
let dcTwoEl = document.getElementById('dcTwo-el')
let dealerSum = 0

if (dealerCardOne[1] === spade || dealerCardOne[1] === club) {
    dcOneEl.style.color = 'black'
} else {
    dcOneEl.style.color = 'red'
}
if (dealerCardTwo[1] === spade || dealerCardTwo[1] === club) {
    dcTwoEl.style.color = 'black'
} else {
    dcTwoEl.style.color = 'red'
}

function getDealerCards() {
    dcOneEl.textContent = dealerCardOne.join('')
    dcTwoEl.textContent = dealerCardTwo.join('')
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
    document.getElementById('roundResult-el').textContent = result()
}

let hitCardEl = document.getElementById('hitCard-el')


function addCard() {
    document.getElementById('hitCard').style.visibility = 'visible'
    let addedCard = randCard(cardDeck)
    if (addedCard[1] === spade || addedCard[1] === club) {
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
// not true odds as the full deck is not filled out (i.e. no face cards, no suits)
// this applies to both dealer and players. 
// as a result you can get two '11' cards for instance
// obviously can't bet
// have to follow general black jack rules - can't try to break it
// have to reload page to deal a new hand