import axios from "axios";
import { ApiResponse, Pokemon} from "../interfaces/pokemonInterface";


export const getAllPokemon = async ({ page, search }: { page: number; search?: string }) => {
    try {
        let url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page}`;

        // Si hay un término de búsqueda, ajusta la URL para buscar por nombre
        if (search) {
            url = `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`;
        }

        const response = await axios.get(url);

        if (response.status === 200) {
            let pokemonList: ApiResponse[] = [];

            // Si no hay búsqueda, usamos el resultado de la paginación
            if (!search) {
                pokemonList = response.data.results;
            } else {
                // Si hay búsqueda, respondemos solo con el Pokémon buscado
                pokemonList = [response.data];
            }

            // Mapeamos la lista de detalles de cada pokemon
            const pokemonDetails: (Pokemon | null)[] = await Promise.all(
                pokemonList.map(async (pokemon: ApiResponse) => {
                    try {
                        const pokemonResponse = await axios.get(pokemon.url || `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
                        if (pokemonResponse.status === 200) {
                            const { name, sprites } = pokemonResponse.data;
                            return {
                                name,
                                image: sprites.other["official-artwork"].front_default,
                                sprite: sprites.versions["generation-viii"].icons.front_default
                            };
                        }
                        return null;
                    } catch (error) {
                        console.error(`Error fetching details for ${pokemon.name}:`, error);
                        return null;
                    }
                })
            );
            return pokemonDetails.filter((pokemon): pokemon is Pokemon => pokemon !== null)
        } else {
            return [];
        }
    } catch (error) {
        console.error("An error occurred:", error);
        return [];
    }
};

export const getByType = async (type: number) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);

        if (response.status === 200) {
            // Extraer el listado de Pokémon de la respuesta
            const pokemonList = response.data.pokemon;
            console.log(pokemonList)

            // Mapear la lista para obtener los detalles de cada Pokémon
            const pokemonDetails: (Pokemon | null)[] = await Promise.all(
                pokemonList.map(async (entry: { pokemon:ApiResponse }) => {
                    try {
                        const pokemonResponse = await axios.get(entry.pokemon.url); // Accedemos a la URL del Pokémon
                        if (pokemonResponse.status === 200) {
                            const { name, sprites } = pokemonResponse.data;
                            return {
                                name,
                                image: sprites.other["official-artwork"].front_default
                            };
                        }
                        return null;
                    } catch (error) {
                        console.error(`Error fetching details for ${entry.pokemon.name}:`, error);
                        return null;
                    }
                })
            );

            return pokemonDetails.filter((pokemon) => pokemon !== null);
        } else {
            return [];
        }
    } catch (error) {
        console.error("An error occurred:", error);
        return [];
    }
};

export const getByAbility = async (ability: string) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/ability/${ability}`);

        if (response.status === 200) {
            // Extraer el listado de Pokémon de la respuesta
            const pokemonList = response.data.pokemon;
            console.log(pokemonList)

            // Mapear la lista para obtener los detalles de cada Pokémon
            const pokemonDetails: (Pokemon | null)[] = await Promise.all(
                pokemonList.map(async (entry: { pokemon:ApiResponse }) => {
                    try {
                        const pokemonResponse = await axios.get(entry.pokemon.url); // Accedemos a la URL del Pokémon
                        if (pokemonResponse.status === 200) {
                            const { name, sprites } = pokemonResponse.data;
                            return {
                                name,
                                image: sprites.other["official-artwork"].front_default
                            };
                        }
                        return null;
                    } catch (error) {
                        console.error(`Error fetching details for ${entry.pokemon.name}:`, error);
                        return null;
                    }
                })
            );

            return pokemonDetails.filter((pokemon) => pokemon !== null);
        } else {
            return [];
        }
    } catch (error) {
        console.error("An error occurred:", error);
        return [];
    }
};

export const getTypes = async () => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/type`);
          
        if (response.status === 200) {
          return response.data.results;
        } else {
          return [];
        }
      } catch (error) {
        console.error("An error occurred:", error);
        return [];
      }
  }

  export const getAbilities = async () => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/ability`);
          
        if (response.status === 200) {
          return response.data.results;
        } else {
          return [];
        }
      } catch (error) {
        console.error("An error occurred:", error);
        return [];
      }
  }


  export const getPokemon = async (name:string) => {
      try {
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            
          // Check if the HTTP response is successful
          if (response.status === 200) {
            // The response data is already in JSON format
            return response.data;
          } else {
            return [];
          }
        } catch (error) {
          console.error("An error occurred:", error);
          return [];
        }
    }
  