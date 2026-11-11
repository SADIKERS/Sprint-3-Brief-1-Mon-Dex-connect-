const grid = document.querySelector("#grid");

export function displayCards(cards, append = false){
    if(!append){
        grid.innerHTml = "";
    }

    cards.forEach ((card) => {
        const article = document.createElement("article");

        article.className = "rounded-xl bg-white p-3 shadow-md border border-gray-200";

        const image = document.createElement("img");
        image.src = card.image;
        image.alt = card.name;
        image.className = "w-full rounded-lg";

        const type = document.createElement("p");
        type.textContent = card.type;
        type.className = "text-sm text-gray-500";

        const stats = document.createElement("P");
        stats.textContent = `ATK: ${card.atk ?? "—"} | DEF: ${card.def ?? "—"}`;
        stats.className = "text-sm mt-2";

        article.append(image, title, type, stats);

        grid.append(article);
    });
}