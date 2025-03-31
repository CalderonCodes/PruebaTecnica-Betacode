export interface Pokemon {
  name: string;
  image: string;
  sprite: string;
}

export interface PokeDetails {
  id: number;
  name: string;
  abilities: string[];
  types: string[];
  stats: Stat[];
  image: string;
  sprite: string;
}

export interface TeamPokemon {
  id: number;
  name: string;
  image: string;
}

export interface Team {
  id: number;
  name: string;
  pokemon: Pokemon[];
}

interface Stat {
  base_stat: number;
  name: string;
}

export interface ApiResponse {
  name: string;
  url: string;
}
