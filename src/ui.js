
const grid = document.querySelector("#grid");

// Affichage des cartes
export function displayCards(cards, append = false) {

    // Ila ma bghinach nzido 3la les cartes l9dam
    if (!append) {
        grid.innerHTML = "";
    }

    // Affichage dyal les cartes
    grid.innerHTML += cards.map(card => `
        <article data-id="${card.id}"
            class="flex flex-col gap-2 rounded-card border-2 border-black bg-yellow-500/50 p-3 shadow-xl">

            <img
                src="${card.image}"
                alt="${card.name}"
                class="w-full rounded-xl object-cover"
            >

            <h3 class="font-bold">
                ${card.name}
            </h3>

            <p class="text-sm">
                ${card.attribute || "Unknown"}
            </p>

            <p class="text-sm">
                ${card.type}
            </p>

            <div class="flex justify-between text-sm font-bold">
                <span>ATK: ${card.stats.atk}</span>
                <span>DEF: ${card.stats.def}</span>
            </div>
            <button type="button" data-add-team="${card.id}" class="btn-outline w-full min-w-0 whitespace-normal break-words px-2 py-2 text-center text-xs leading-tight sm:text-sm">
                Ajouter à l'équipe
            </button>
        </article>
    `).join("");
}
