const gridCard = document.querySelector(".board-game");
let cards = [];
let firstCard, secondCard;
let isPlaying = false;

fetch("./data/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    shuffleCard();
    generateCard();
  });

function shuffleCard() {
  let currentIndex = cards.length, randomIndex, tempValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    tempValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = tempValue;
  }
}

function generateCard() {
  for (let card of cards) {
    const cardItem = document.createElement("div");
    cardItem.classList.add("card");
    cardItem.setAttribute("data-name", card.imageName);
    cardItem.innerHTML = `
      <div class="front-side">
        <img class="front-image" src=${card.imageUrl} alt="front" />
      </div>
      <div class="back-side">
        <img class="front-image" src="/01-matching-game/assets/cutlery-spoon.png" alt="back" />
      </div>
    `;
    gridCard.appendChild(cardItem);
    cardItem.addEventListener("click", flipCard);
  }
}

function flipCard() {
  if (isPlaying) return;
  if (this === firstCard) return;

  this.classList.add("flip-card");

  if (!firstCard) {
    firstCard = this;
    return;
  }
  
  secondCard = this;
  isPlaying = true;
  matchCard();
}

function matchCard() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;
  isMatch ? disableCard() : unflipCards();
}

function disableCard() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flip-card");
    secondCard.classList.remove("flip-card");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  isPlaying = false;
}

function restart() {
  resetBoard();
  shuffleCard();
  gridCard.innerHTML = "";
  generateCard();
}