
const API_URL = "https://db.ygoprodeck.com/api/v7/cardinfo.php";

export async function getCards(offset = 0) {
    try {
        const url = `${API_URL}?num=20&offset=${offset}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch cards");
        }

        const result = await response.json();

        return result.data.map(card => transformCard(card));

    } catch (error) {
        throw error;
    }
}

function transformCard(card) {
    return {
        id: card.id,
        name: card.name,
        type: card.type,
        attribute: card.attribute ?? "Unknown",
        race: card.race,
        level: card.level ?? 0,
        stats: {
            atk: card.atk ?? 0,
            def: card.def ?? 0
        },

        image: card.card_images?.[0]?.image_url ?? "",
        description: card.desc
    };
}
