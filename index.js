
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

function deal() {
    firstCardEl.textContent = firstCard
    secondCardEl.textContent = secondCard
    totalEl.textContent += playerSum
    statusOfPlayer.textContent = playerStatus()
}

let dealerCardOne = randomNum(2, 11)
let dealerCardTwo = randomNum(2, 11)
let dcOneEl = document.getElementById('dcOne-el')
let dcTwoEl = document.getElementById('dcTwo-el')
let dealerSum = dealerCardTwo + dealerCardOne


function getDealerCards() {
    dcOneEl.textContent = dealerCardOne
    dcTwoEl.textContent = dealerCardTwo
    document.getElementById('roundResult-el').textContent = result()
}

function addCard() {
    let addedCard = randomNum(2,11)
    playerSum += addedCard
    totalEl.textContent = 'Total: ' + playerSum
    statusOfPlayer.textContent = playerStatus(playerSum)
    document.getElementById('hitCard').style.visibility = 'visible'
    document.getElementById('hitCard-el').textContent = addedCard
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
        return 'You lose! You fucking loser!'
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