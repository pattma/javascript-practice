const gridBoard = document.querySelector(".board-game");
let cards = [];
let firstCard, secondCard;

fetch("./data/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    generateCards();
    // randomCards();
  });

function generateCards() {
  for (let card of cards) {
    const cardItem = document.createElement("div");
    cardItem.classList.add("card");
    cardItem.setAttribute("image-name", card.imageName);
    cardItem.innerHTML = `
      <div class="front-side">
        <img class="front-image" src=${card.imageUrl} alt="" />
      </div>
      <div class="back-side"></div>`;
    gridBoard.appendChild(cardItem);
    cardItem.addEventListener("click", flipCard);
  }
}

function randomCards() {
  let currentIndex = cards.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
  }
}