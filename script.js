let balance = 1000;
let currentBet = null;
let betAmount = 10;

const balanceInput = document.getElementById('balance');
const amountInput = document.getElementById('amount');
const downButton = document.getElementById('down');
const lucky7Button = document.getElementById('lucky7');
const upButton = document.getElementById('up');
const rollButton = document.getElementById('roll');
const dice1 = document.getElementById('dice1');
const dice2 = document.getElementById('dice2');
let resultText = document.getElementById('result-text');
const cont = document.getElementById('contain');
const title = document.getElementById('title');

document.addEventListener("DOMContentLoaded", () => {
    function isPhoneDevice() {
        return /Mobi|Android|iPhone|iPod/i.test(navigator.userAgent) || window.innerWidth <= 600;
    }

    if (!isPhoneDevice()) {
        // Create custom cursor only if it doesn't already exist
        if (!document.querySelector(".custom-cursor")) {
            const cursor = document.createElement("div");
            cursor.classList.add("custom-cursor");
            document.body.appendChild(cursor);
        }

        document.body.style.cursor = "none"; // Hide default cursor

        // Track mouse movement
        document.addEventListener("mousemove", (e) => {
            const cursor = document.querySelector(".custom-cursor");
            if (cursor) {
                cursor.style.left = `${e.clientX}px`;
                cursor.style.top = `${e.clientY}px`;
            }
        });

        document.addEventListener("mouseenter", () => {
            const cursor = document.querySelector(".custom-cursor");
            if (cursor) {
                cursor.style.display = "block";
            }
        });

        document.addEventListener("mouseleave", () => {
            const cursor = document.querySelector(".custom-cursor");
            if (cursor) {
                cursor.style.display = "none";
            }
        });
    } else {
        document.body.style.cursor = "default";
        const cursor = document.querySelector(".custom-cursor");
        if (cursor) cursor.remove(); // Remove cursor element on phones
    }
});

// Function to handle hover effects
function applyHoverEffects() {
    if (window.innerWidth > 600) { // Only enable on tablets and larger screens
        cont.addEventListener("mouseover", mouseOverEffect);
        cont.addEventListener("mouseout", mouseOutEffect);
    } else {
        cont.removeEventListener("mouseover", mouseOverEffect);
        cont.removeEventListener("mouseout", mouseOutEffect);
    }
}

function mouseOverEffect() {
    cont.style.backgroundColor = "rgb(38, 59, 82)";
    title.style.transform = "scale(1.2)";
    title.style.transition = "transform 0.3s ease-in-out";
}

function mouseOutEffect() {
    cont.style.backgroundColor = "#34495e";
    title.style.transform = "scale(1)";
}

// Initial check and event listener for resizing
applyHoverEffects();
window.addEventListener("resize", applyHoverEffects);

// Event listeners for betting
downButton.addEventListener('click', () => placeBet('down'));
lucky7Button.addEventListener('click', () => placeBet('lucky7'));
upButton.addEventListener('click', () => placeBet('up'));
rollButton.addEventListener('click', rollDice);
amountInput.addEventListener('input', () => {
    betAmount = parseInt(amountInput.value);
});

// Function to place a bet
function placeBet(betType) {
    if (betAmount > balance) {
        alert('Insufficient balance!');
        return;
    }
    currentBet = betType;
    resultText.style.color = `white`;
    resultText.textContent = `You've bet on ${betType === 'down' ? '7 Down' : betType === 'up' ? '7 Up' : 'Lucky 7'}`;
}

// Function to roll the dice and determine results
function rollDice() {
    if (!currentBet) {
        alert('Please place a bet first!');
        return;
    }

    const dice1Value = Math.floor(Math.random() * 6) + 1;
    const dice2Value = Math.floor(Math.random() * 6) + 1;
    const total = dice1Value + dice2Value;

    dice1.textContent = `🎲 ${dice1Value}`;
    dice2.textContent = `🎲 ${dice2Value}`;

    let result = '';
    if (currentBet === 'down' && total >= 2 && total <= 6) {
        result = 'You won! 7 Down pays 1:1';
        resultText.style.color = `rgb(139, 224, 139)`;
        balance += betAmount;
    } else if (currentBet === 'up' && total >= 8 && total <= 12) {
        result = 'You won! 7 Up pays 1:1';
        resultText.style.color = `rgb(139, 224, 139)`;
        balance += betAmount;
    } else if (currentBet === 'lucky7' && total === 7) {
        result = 'You won! Lucky 7 pays 3:1';
        resultText.style.color = `rgb(139, 224, 139)`;
        balance += betAmount * 3;
    } else {
        result = 'You lost!';
        resultText.style.color = `rgb(252, 78, 78)`;
        balance -= betAmount;
    }

    resultText.textContent = `Dice Total: ${total}. ${result}`;
    balanceInput.value = balance;
    currentBet = null;
}


