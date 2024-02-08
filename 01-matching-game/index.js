const gridCard = document.querySelector(".board-game");
let cards = [];
let firstCard, secondCard;
let isBoardActive = false; // To prevent clicking on cards while checking for matches or flipping cards

// Fetch card data
const fetchCardData = async () => {
  try {
    const response = await fetch("./data/cards.json");
    const data = await response.json();
    cards = [...data, ...data];
    shuffleCard();
    generateCard();
  } catch (error) {
    console.error("Error fetching card data:", error);
  }
}

// Shuffle cards
const shuffleCard = async () => {
  let currentIndex = cards.length;
  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    [cards[currentIndex], cards[randomIndex]] = [cards[randomIndex], cards[currentIndex]];
  }
}

// Generate cards (using for...of loop and template literals)
const generateCard = async () => {
  for (const card of cards) {
    const cardItem = document.createElement("div");
    cardItem.classList.add("card");
    cardItem.setAttribute("data-name", card.imageName);
    cardItem.innerHTML = `
      <div class="front-side">
        <img class="front-image" src=${card.imageUrl} />
      </div>
      <div class="back-side">
        <img class="front-image" src="/01-matching-game/assets/cutlery-spoon.png" alt="back" />
      </div>
    `;
    gridCard.appendChild(cardItem);
    cardItem.addEventListener("click", flipCard);
  }
}

// Event listener for card click
const flipCard = function () {
  if (!isBoardActive) return;
  if (this === firstCard) return;

  this.classList.add("flip-card");

  if (!firstCard) {
    firstCard = this;
    return;
  }
  
  secondCard = this;
  isBoardActive = false; // Lock the board to prevent further clicks during processing
  matchCard();
};

// Check for match cards (using ternary operator)
const matchCard = () => {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;
  isMatch ? disableCard() : unflipCard();
}

// Disable cards (using array destructuring)
const disableCard = () => {
  [firstCard, secondCard].forEach(card => {
    card.removeEventListener("click", flipCard);
    card.style.visibility = "hidden"; // Hide the matched cards
  });
  resetBoard();
};

// Unflip cards (using setTimeout)
const unflipCard = () => {
  setTimeout(() => {
    [firstCard, secondCard].forEach(card => {
      card.classList.remove("flip-card");
      card.style.visibility = "visible"; // Make the cards visible again
    });
    resetBoard();
  }, 1000);
};

// Reset board
const resetBoard = () => {
  [firstCard, secondCard] = [null, null];
  isBoardActive = true; // Unlock the board for the next round of clicks

  // To ensure cards are shuffled only after the initial load
  if (cards.length === 0) {
    shuffleCards();
    generateCards();
  }
};

// Restart game
const restart = () => {
  resetBoard(); // To clear variables and unlock the board
  shuffleCard();
  gridCard.innerHTML = ""; // To clear the content of the grid container
  generateCard();
};

// Event listener for window load to initialize the game
window.addEventListener('load', () => {
  fetchCardData(); // Initialize the game
  resetBoard();    // Reset the board and shuffle the cards
});