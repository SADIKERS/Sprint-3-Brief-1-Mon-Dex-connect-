const API_URL = "https://db.ygoprodeck.com/api/v7/cardinfo.php";

export async function getCards(offest = 0){
    const url = `${API_URL}?num=20&offset=${offset}`;

    const response = await fetch(url);

    if(!response.ok){
        throw new Error("Failed to fetch cards");
    }

    const result = await response.json();

    const cards = result.data.map((card) => {
        return{
            id:card.id,
            name: card.name,
            type: card.type,
            attribute: card.attribute || "Unknown",
            race: card.race,
            atk: card.atk ?? null,
            def: card.def ?? null,
            level: card.level ?? null,
            image: card.card_image?.[0]?.image_url || "",
            description: card.desc
        };
    });
    return cards;
    
}