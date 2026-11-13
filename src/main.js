import { getCards, searchCards, getCardDetail } from "./services/api.js";
import { displayCards, displayCardDetail } from "./ui.js";

let offset = 20;

const loadMoreButton = document.querySelector("#load-more");
const message = document.querySelector("#message");


async function loadCards() {
  try {
    message.textContent = "Loading cards...";

    loadMoreButton.disabled = true;

    const cards = await getCards(offset);

    allCards = allCards.concat(cards);
    currentCards = allCards;

    updateCards();

    offset += cards.length;

    message.textContent = "";

  } catch (error) {
    message.textContent = error.message;
    console.error(error);

  } finally {
    loadMoreButton.disabled = false;
  }
}

loadMoreButton.addEventListener("click", loadCards);

loadCards();


// Recherche des cartes
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search");
const clearSearchButton = document.querySelector("#clear-search");

searchForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const name = searchInput.value.trim();

  if (name === "") return;

  try {
    message.textContent = "Recherche en cours...";
    grid.innerHTML = "";

    loadMoreButton.disabled = true;

    const cards = await searchCards(name);

    currentCards = cards;
    updateCards();

    if (cards.length === 0) {
      message.textContent = "Aucune carte trouvée.";
    } else {
      message.textContent = "";
    }

  } catch (error) {
    message.textContent = "Erreur pendant la recherche.";
    console.error(error);
  }
});

clearSearchButton.addEventListener("click", function() {

    searchInput.value = "";

    currentCards = allCards;
    selectedAttribute = "Tous";

    offset = allCards.length;

    updateCards();
});


//filtrer des cartes 
let allCards = [];
let currentCards = [];
let selectedAttribute = "Tous";

const filters = document.querySelector("#filters");
function updateCards() {

  const filteredCards = currentCards.filter(function (card) {

    return selectedAttribute === "Tous" ||
      card.attribute === selectedAttribute;

  });

  displayCards(filteredCards);
}

filters.addEventListener("click", function(event) {

    const button = event.target.closest("button[data-type]");

    if (!button) return;

    selectedAttribute = button.dataset.type;

    updateCards();
});

/* 2. DÉTAIL DE LA CARTE */

const grid = document.querySelector("#grid");

// Mlli kanclikiw 3la carte, kanjibo les détails dyalha
grid.addEventListener("click", async function (event) {

    const card = event.target.closest("article[data-id]");

    // Ila ma kanch click 3la carte, kan7ebso l'exécution
    if (!card) return;

    // Ila kan click 3la bouton, ma kan7ellouch les détails
    if (event.target.closest("button")) return;

    // Kanakhdo ID dyal carte
    const cardId = card.dataset.id;

    try {
        message.textContent = "Loading card details...";

        const selectedCard = await getCardDetail(cardId);

        displayCardDetail(selectedCard);

        message.textContent = "";

    } catch (error) {
        message.textContent = "Error loading card details.";
        console.error(error);
    }
});
/* 3. FERMER LE DÉTAIL */

// Mlli kanclikiw 3la bouton fermer, kan5ebiw panneau
document.querySelector("#close-detail").addEventListener("click", function () {
    document.querySelector("#detail").classList.add("hidden");
});