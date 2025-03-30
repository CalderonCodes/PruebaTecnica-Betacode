import axios from "axios";
import { Pokemon } from "../interfaces/pokemonInterface";


interface PokemonUrl {
    name: string,
    url: string
}



export const getAllPokemon = async ({ page, search }: { page: number; search?: string }) => {
    try {
        let url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page}`;

        // Si hay un término de búsqueda, ajusta la URL para buscar por nombre
        if (search) {
            url = `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`;
        }

        const response = await axios.get(url);

        if (response.status === 200) {
            let pokemonList: PokemonUrl[] = [];

            // Si no hay búsqueda, usamos el resultado de la paginación
            if (!search) {
                pokemonList = response.data.results;
            } else {
                // Si hay búsqueda, respondemos solo con el Pokémon buscado
                pokemonList = [response.data];
            }

            // Mapeamos la lista de detalles de cada pokemon
            const pokemonDetails: (Pokemon | null)[] = await Promise.all(
                pokemonList.map(async (pokemon: PokemonUrl) => {
                    try {
                        const pokemonResponse = await axios.get(pokemon.url || `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
                        if (pokemonResponse.status === 200) {
                            const { name, sprites } = pokemonResponse.data;
                            return {
                                name,
                                image: sprites.other["official-artwork"].front_default
                            };
                        }
                        return null;
                    } catch (error) {
                        console.error(`Error fetching details for ${pokemon.name}:`, error);
                        return null;
                    }
                })
            );
            // Filter out any failed requests
            return pokemonDetails.filter((pokemon): pokemon is Pokemon => pokemon !== null)
        } else {
            return [];
        }
    } catch (error) {
        console.error("An error occurred:", error);
        return [];
    }
};