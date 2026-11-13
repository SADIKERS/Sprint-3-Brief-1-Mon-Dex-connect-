
import { getCards } from "./services/api.js";
import { displayCards } from "./ui.js";

let offset = 20;

const loadMoreButton = document.querySelector("#load-more");
const message = document.querySelector("#message");

async function loadCards() {
  try {
    message.textContent = "Loading cards...";

    loadMoreButton.disabled = true;

    const cards = await getCards(offset);

    displayCards(cards, offset > 0);

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
