export interface Pokemon {
    name: string,
    image: string
}

export interface PokeDetails{
    name: string,
    abilities: string[],
    types: string[],
    stats: Stat[],
    image: string
}


interface Stat {
    base_stat: number;
    name: string;
  }

export interface ApiResponse {
    name: string,
    url: string
}
