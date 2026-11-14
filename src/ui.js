
const grid = document.querySelector("#grid");

// Affichage des cartes
export function displayCards(cards, append = false, favorites = []) {

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
           <button
                type="button"
                data-favorite="${card.id}"
                class="rounded-lg border border-black px-3 py-2 ${favorites.includes(String(card.id)) ? "bg-red-200 text-red-700" : ""}">
                    ${favorites.includes(String(card.id)) ? "❤️ Favorited" : "🤍 Favorite"}
            </button>
        </article>
    `).join("");
}


/* 2. DÉTAIL DE LA CARTE */

// Affichage des détails d'une carte
export function displayCardDetail(card) {

    document.querySelector("#detail").classList.remove("hidden");

    document.querySelector("#detail-title").textContent = `${card.id} - Détail`;

    document.querySelector("#detail-image").src = card.image;
    document.querySelector("#detail-image").alt = card.name;

    document.querySelector("#detail-name").textContent = card.name;
    document.querySelector("#detail-type").textContent = card.type;

    document.querySelector("#detail-level").textContent = card.level;
    document.querySelector("#detail-level-value").textContent = card.level;

    document.querySelector("#detail-description").textContent = card.description;

    document.querySelector("#detail-atk").textContent = card.stats.atk;
    document.querySelector("#detail-def").textContent = card.stats.def;

    // Calcul des barres des statistiques
    document.querySelector("#detail-atk-bar").style.width =
        `${(card.stats.atk / 4000) * 100}%`;

    document.querySelector("#detail-def-bar").style.width =
        `${(card.stats.def / 4000) * 100}%`;

    document.querySelector("#detail-level-bar").style.width =
        `${(card.level / 10) * 100}%`;
}