
const API_URL = "https://pokeapi.co/api/v2/";

const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`${API_URL}pokemon/${pokemon}`);
        if (!response.ok) throw new Error("Pokemon no encontrado");
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (err) {
        console.error(err);
        alert("No se pudo obtener el Pokémon. Verifica el nombre o ID ingresado.");
        return null;
    }
};

// Función para mostrar el Pokémon en la tarjeta
const displayPokemonCard = (pokemon) => {
    if (!pokemon) return;

    document.getElementById("pokemon-image").src = pokemon.sprites.front_default;
    document.getElementById("pokemon-name").textContent = `Name: ${pokemon.name}`;
    document.getElementById("pokemon-id").textContent = `ID: ${pokemon.id}`;
    document.getElementById("pokemon-weight").textContent = `Weight: ${pokemon.weight}`;
};

// Obtener Pokémon al hacer clic en "Get Pokemon"
document.getElementById('get-btn').addEventListener('click', async () => {
    const text = document.getElementById("poke-name").value.toLowerCase();
    const pokemon = await fetchPokemon(text);

    if (pokemon) {
        localStorage.setItem("pokemonId", pokemon.id);
        displayPokemonCard(pokemon);
    }
});

// Obtener Pokémon anterior
document.getElementById("prev-btn").addEventListener("click", async () => {
    let currentPokemonId = parseInt(localStorage.getItem("pokemonId")) || 1;
    const newId = Math.max(1, currentPokemonId - 1);
    const pokemon = await fetchPokemon(newId);

    if (pokemon) {
        localStorage.setItem("pokemonId", pokemon.id);
        displayPokemonCard(pokemon);
    }
});

// Obtener Pokémon siguiente
document.getElementById("next-btn").addEventListener("click", async () => {
    let currentPokemonId = parseInt(localStorage.getItem("pokemonId")) || 1;
    const newId = currentPokemonId + 1;
    const pokemon = await fetchPokemon(newId);

    if (pokemon) {
        localStorage.setItem("pokemonId", pokemon.id);
        displayPokemonCard(pokemon);
    }
});

// Cargar el Pokémon guardado en localStorage al iniciar la página
document.addEventListener("DOMContentLoaded", async () => {
    const savedId = parseInt(localStorage.getItem("pokemonId")) || 1;
    const pokemon = await fetchPokemon(savedId);
    displayPokemonCard(pokemon);
});
