import { getCards, searchCards, getCardDetail } from "./services/api.js";
import { displayCards, displayCardDetail } from "./ui.js";
import { getFavorites, saveFavorites } from "./storage.js";

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

 displayCards(filteredCards, false, favorites);
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

/* 3. FAVORITES */

// Kanjibo les favoris li مخزنين
let favorites = getFavorites();

// Mlli المستخدم kayklik 3la bouton Favorite
grid.addEventListener("click", function (event) {
  const button = event.target.closest("button[data-favorite]");

  // Ila ma kanch click 3la bouton Favorite, kan7ebso l'exécution
  if (!button) return;

  // Kanakhdo ID dyal carte
  const cardId = button.dataset.favorite;

  // Wach carte deja f favorites?
  if (favorites.includes(cardId)) {
    // Kan7eydoha men favorites
    favorites = favorites.filter(function (id) {
      return id !== cardId;
    });

  } else {
    // Kanzidoha l favorites
    favorites.push(cardId);

    button.textContent = "❤️ Favorited";
    button.classList.add("bg-red-200", "text-red-700");
  }

  // Kansajlo les favoris f LocalStorage
  saveFavorites(favorites);
});
/* 4. MON ÉQUIPE */

// Had array katjme3 les monstres li khtar l'utilisateur
const myTeam = [];

// Kanjibo les emplacements w les compteurs dyal l'équipe
const teamslots = document.querySelector("#team-slots");
const teamcount = document.querySelector("#team-count");
const headerteamcount = document.querySelector("#count-team");

// Mlli l'utilisateur kayklik 3la bouton ajouter, kantraitiw l'événement
grid.addEventListener("click", async function (event) {
  const addbutton = event.target.closest("button[data-add-team]");

  // Ila ma kanch click 3la bouton ajouter, kan7ebso l'exécution
  if (!addbutton) return;

  // Kanakhdo l'ID dyal monster li bgha l'utilisateur yzid
  const creatureId = addbutton.dataset.addTeam;

  // Ila l'équipe 3amra b 6 monstres, ma kanzido ta monster akhor
  if (myTeam.length >= 6) {
    alert("Votre équipe est complète !");
    return;
  }

  // Ila monster deja kayn f'équipe, ma kanzidouhch mra khra
  if (myTeam.some(function (creature) {
    return creature.id === Number(creatureId);
  })) {
    alert("Ce monstre est déjà dans votre équipe !");
    return;
  }

  try {
    // Kan9elbo 3la les informations dyal monster f API
    const selectedCreature = await getCardDetail(creatureId);

    // Kanzido monster l'équipe w kan3awdo n'affichiwha
    myTeam.push(selectedCreature);
    displayTeam();

  } catch (error) {
    console.error(error);
    alert("Impossible d'ajouter cette carte.");
  }
});

// Had function kat'affichi l'équipe w kat7edded les compteurs
function displayTeam() {
  // Kan7eddto 3adad les monstres f les deux compteurs
  teamcount.textContent = `${myTeam.length}/6`;
  headerteamcount.textContent = myTeam.length;

  // Kancréyiw emplacement dyal kol monster f'équipe
  teamslots.innerHTML = myTeam.map(function (creature) {
    return `
      <div class="overflow-hidden rounded-lg border border-amber-600">
        <img
          src="${creature.image}"
          alt="${creature.name}"
          title="${creature.name}"
          class="aspect-[3/4] w-full object-cover"
        >
      </div>
    `;
  }).join("");

  // Kanzido emplacements khawyin 7ta ywliw 6 emplacements
  for (let i = myTeam.length; i < 6; i++) {
    teamslots.innerHTML += `
      <div class="flex aspect-[3/4] items-center justify-center rounded-lg border border-dashed border-gray-300 text-xl text-gray-500">
        +
      </div>
    `;
  }
}