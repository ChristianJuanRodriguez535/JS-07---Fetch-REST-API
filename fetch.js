
const API_URL = "https://pokeapi.co/api/v2/";


//& funcion asincrona para obener datos del Pokemon usando fetch
const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`${API_URL}pokemon/${pokemon}`);         //* Realiza la solicitud a la API usando el nombre o ID del Pokémon


        if (!response.ok) throw new Error("Pokemon no encontrado"); //* Verifica si la respuesta es válida, si no, lanza un error

        const parsedResponse = await response.json();         // *Convierte la respuesta a formato JSON


        return parsedResponse;

    } catch (err) {

        //* Muestra el error en la consola y una alerta al usuario

        console.error(err);
        alert("No se pudo obtener el Pokémon. Verifica el nombre o ID ingresado.");
        return null;
    }
};

//& Función para mostrar el Pokémon en la tarjeta
const displayPokemonCard = (pokemon) => {
    if (!pokemon) return;

    // *Si no hay datos del Pokémon, no hace nada

    // *Actualiza la imagen, nombre, ID y peso del Pokémon en la tarjeta

    document.getElementById("pokemon-image").src = pokemon.sprites.front_default;
    document.getElementById("pokemon-name").textContent = `Name: ${pokemon.name}`;
    document.getElementById("pokemon-id").textContent = `ID: ${pokemon.id}`;
    document.getElementById("pokemon-weight").textContent = `Weight: ${pokemon.weight}`;
};

// &Evento Pokémon al hacer clic en "Get Pokemon"
document.getElementById('get-btn').addEventListener('click', async () => {

    // *Obtiene el nombre o ID ingresado por el usuario y lo convierte a minúsculas

    const text = document.getElementById("poke-name").value.toLowerCase();

     // *Obtiene los datos del Pokémon usando fetchPokemon

    const pokemon = await fetchPokemon(text);

    // *Si se encuentra el Pokémon, guarda el ID en localStorage y muestra los datos

    if (pokemon) {
        localStorage.setItem("pokemonId", pokemon.id);
        displayPokemonCard(pokemon);
    }
});

//& Evento para obtener el Pokémon anterior al hacer clic en "Previous"

document.getElementById("prev-btn").addEventListener("click", async () => {

    // *Obtiene el ID actual del Pokémon desde localStorage o usa 1 por defecto
   
    let currentPokemonId = parseInt(localStorage.getItem("pokemonId")) || 1;
    
    // *Calcula el nuevo ID (el ID anterior), asegurándose de que no sea menor a 1

    const newId = Math.max(1, currentPokemonId - 1);
    
    // *Obtiene los datos del Pokémon anterior

    const pokemon = await fetchPokemon(newId);

    //* Si se encuentra el Pokémon, guarda el nuevo ID y muestra los datos
  
    if (pokemon) {
        localStorage.setItem("pokemonId", pokemon.id);
        displayPokemonCard(pokemon);
    }
});


//& Evento para obtener el Pokémon siguiente al hacer clic en "Next"

document.getElementById("next-btn").addEventListener("click", async () => {

    // *Obtiene el ID actual del Pokémon desde localStorage o usa 1 por defecto

    let currentPokemonId = parseInt(localStorage.getItem("pokemonId")) || 1;
   
    // *Calcula el nuevo ID (el siguiente ID)

    const newId = currentPokemonId + 1;
    //* Obtiene los datos del Pokémon siguiente

    const pokemon = await fetchPokemon(newId);
    
    //* Si se encuentra el Pokémon, guarda el nuevo ID y muestra los datos

    if (pokemon) {
        localStorage.setItem("pokemonId", pokemon.id);
        displayPokemonCard(pokemon);
    }
});

//& Cargar el Pokémon guardado en localStorage al iniciar la página
document.addEventListener("DOMContentLoaded", async () => {

    // *Obtiene el ID guardado en localStorage o usa 1 si no existe

    const savedId = parseInt(localStorage.getItem("pokemonId")) || 1;
    
    //* Obtiene los datos del Pokémon usando el ID guardado

    const pokemon = await fetchPokemon(savedId);

    //* Muestra los datos del Pokémon en la tarjeta

    displayPokemonCard(pokemon);
});
