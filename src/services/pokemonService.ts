import axios from "axios";
import { ApiResponse, DetailedAPIResponse, PokeDetails, Pokemon} from "../interfaces/pokemonInterface";


//Obtiene la lista completa de pokemon con paginacion, de 20 en 20
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

            // Si no hay búsqueda usamos el resultado por defecto
            if (!search) {
                pokemonList = response.data.results;
            } else {
                // Si hay búsqueda respondemos con el pokemon individual
                pokemonList = [response.data];
            }

            // La pokeapi solo retorna la url del pokemon
            // Por lo tanto es necesario mapear uno a uno la informacion necesaria
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

//Obtiene la lista completa de pokemon por tipos
export const getByType = async (type: number) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);

        if (response.status === 200) {
            const pokemonList = response.data.pokemon;
            console.log(pokemonList)

            // Mapear la lista para obtener los detalles de cada Pokémon
            const pokemonDetails: (Pokemon | null)[] = await Promise.all(
                pokemonList.map(async (entry: { pokemon:ApiResponse }) => {
                    try {
                        const pokemonResponse = await axios.get(entry.pokemon.url);
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

//Obtiene la lista completa de pokemon por habilidad
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


//Obtiene lista completa de tipos
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


//Obtiene lista completa de habilidades
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


//Obtiene detalles de un pokemon individual
export const getPokemon = async (name: string): Promise<PokeDetails | null> => {
    try {
      const response = await axios.get<DetailedAPIResponse>(`https://pokeapi.co/api/v2/pokemon/${name}`);
  
      if (response.status !== 200) return null;
  
      const data = response.data;
  
      //Mapea los datos de respuesta
      const pokeData: PokeDetails = {
        id: data.id,
        name: data.name,
        abilities: data.abilities.map((ability) => ability.ability.name), //Solamente mapea nombre de habilidad
        types: data.types.map((type) => type.type.name), // Solamente mapea nombre de tipo
        stats: data.stats.map((stat) => ({ // Mapea nombre y valor del stat
          base_stat: stat.base_stat,
          name: stat.stat.name,
        })),
        image: data.sprites.other["official-artwork"].front_default,
        sprite: data.sprites.versions["generation-viii"].icons.front_default,
      };
  
      return pokeData;
    } catch (error) {
      console.error("An error occurred:", error);
      return null;
    }
  };
  