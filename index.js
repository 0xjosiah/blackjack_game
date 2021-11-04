
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
  console.log(firstCard);
  console.log(secondCard);



function addCard() {
    playerSum += randomNum(2,11)
    totalEl.textContent = 'Total: ' + playerSum
    statusOfPlayer.textContent = playerStatus(playerSum)
    // return sum
}
// console.log(addCard())

function isBusted(sum) {
    if (sum < 21) {
        return false;
    } else if (sum === 21) {
        return false;
    } else {
        return true;
    }
}
function isBlackjack(sum) {
    if (sum === 21) {
        return true;
    } else {
        return false;
    }
}
function playerStatus() {
    if (isBusted(playerSum)===true) {
        return "Busted!"
    } else if (isBlackjack(playerSum)===true) {
        return "Congrats! You have Blackjack!"
    } else {
        return "Do you want to hit or stay?"
    }
}
console.log(`are you busted? ${isBusted()}`)
console.log(`do you have blackjack? ${isBlackjack()}`)
console.log(playerStatus())