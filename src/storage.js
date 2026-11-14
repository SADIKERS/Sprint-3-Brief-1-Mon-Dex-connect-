/* 1. FAVORITES - LOCAL STORAGE */

// Récupérer les favoris
export function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

// Sauvegarder les favoris
export function saveFavorites(favorites) {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}