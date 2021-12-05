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
    //'deletes' dealt card from deck
    cardDeck[card[1]].splice(cardDeck[card[1]].indexOf(card[0]), 1)
    return card
}

let firstCard = []
let secondCard = []
let firstCardEl = document.getElementById('firstCard-el')
let secondCardEl = document.getElementById('secondCard-el')
let playerSum = 0
let totalEl = document.getElementById('total-el')
let statusOfPlayer = document.getElementById('player-status')

let dealerCardOne = []
let dealerCardTwo = []
let dcOneEl = document.getElementById('dcOne-el')
let dcTwoEl = document.getElementById('dcTwo-el')
let dealerSum = 0
let dealerCardCount = 0
let dealerTotalEl = document.getElementById('dealer-total-el')

function deal() {
    //deals cards
    firstCard = randCard(cardDeck)
    dealerCardOne = randCard(cardDeck)
    dealerCardCount +=1
    secondCard = randCard(cardDeck)
    dealerCardTwo = randCard(cardDeck)
    dealerCardCount +=1
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
    //appropriately shades dealer card2
    if (dealerCardTwo[1] === '♠️' || dealerCardTwo[1] === '♣️') {
        dcTwoEl.style.color = 'black'
    } else {
        dcTwoEl.style.color = 'red'
    }
    //prints player cards and dealer card2 on screen
    firstCardEl.textContent = firstCard.join('')
    secondCardEl.textContent = secondCard.join('')
    dcTwoEl.textContent = dealerCardTwo.join('')
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
    } else if (secondCard[0] === 'A' && firstCard[0] !== 'A') {
        playerSum += 11
    } else if (secondCard[0] === 'A' && firstCard[0] === 'A') {
        playerSum += 1
    } else {
        playerSum += secondCard[0]
    }
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
    } else if (dealerCardTwo[0] === 'A' && dealerCardOne[0] !== 'A') {
        dealerSum += 11
    } else if (dealerCardTwo[0] === 'A' && dealerCardOne[0] === 'A') {
        dealerSum += 1
    } else {
        dealerSum += dealerCardTwo[0]
    }
    if (dealerSum === 21) {
        getDealerCards()
    }
    //prints player sum
    totalEl.textContent += playerSum
    //prints player status
    statusOfPlayer.textContent = playerStatus()
}

let hitCardEl = document.getElementById('hitCard-el')

function addCard() {
    document.getElementById('hitCard').classList.add('active')
    document.getElementById('hitCard').style.transform = 'scale(1)'
    let addedCard = randCard(cardDeck)
    if (addedCard[1] === '♠️' || addedCard[1] === '♣️') {
        hitCardEl.style.color = 'black'
    } else {
        hitCardEl.style.color = 'red'
    }
    hitCardEl.textContent = addedCard.join('')
    if (addedCard[0] === 'A' && playerSum < 11) {
        playerSum += 11
    } else if (addedCard[0] === 'A' && playerSum >= 11) {
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

function getDealerCards() {
    //shades dealer card1
    if (dealerCardOne[1] === '♠️' || dealerCardOne[1] === '♣️') {
        dcOneEl.style.color = 'black'
    } else {
        dcOneEl.style.color = 'red'
    }
    //prints dealer's remaining card
    dcOneEl.textContent = dealerCardOne.join('')
    //deals remaining cards if necessary 
    if (dealerSum < 17) {
        setTimeout(dealerAddCard, 1000)
        // dealerAddCard()
    } else {
        document.getElementById('roundResult-el').textContent = result()
        document.getElementById('roundResult-el').classList.add('active')
    }
    //prints dealer sum
    dealerTotalEl.textContent = `Total: ${dealerSum}`
    //prints final result
}

let dealerHitCardEl = document.getElementById('dHitCard-el')

function dealerAddCard() {
    document.getElementById('dHitCard').classList.add('active')
    document.getElementById('dHitCard').style.transform = 'scale(1)'
    // modal.classList.add('active')
    let addedCard = randCard(cardDeck)
    dealerCardCount +=1
    if (addedCard[1] === '♠️' || addedCard[1] === '♣️') {
        dealerHitCardEl.style.color = 'black'
    } else {
        dealerHitCardEl.style.color = 'red'
    }
    dealerHitCardEl.textContent = addedCard.join('')
    if (addedCard[0] === 'A' && dealerSum < 11) {
        dealerSum += 11
    } else if (addedCard[0] === 'A' && dealerSum >= 11) {
        dealerSum += 1
    } else if (addedCard[0] === 'J' || addedCard[0] === 'Q' || addedCard[0] === 'K') {
        dealerSum += 10
    } else {
        dealerSum += addedCard[0]
    }
    dealerTotalEl.textContent =  `Total: ${dealerSum}`
    if (isBusted(dealerSum)) {
        document.getElementById('dealer-total-el').textContent += ' - Dealer Bust'
        document.getElementById('roundResult-el').textContent = 'Wow, you win!'
    } else {
        document.getElementById('roundResult-el').textContent = result()
        document.getElementById('roundResult-el').classList.add('active')
    }
}

if (dealerCardCount >= 3 && dealerSum < 17) {
    setTimeout(dealerAddCard, 1000)
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