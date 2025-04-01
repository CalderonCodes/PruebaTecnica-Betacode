
//Interface de respuesta de listado de pokemon
export interface Pokemon {
  
  id: number;
  name: string;
  image: string;
  sprite: string;
}

//Interface de datos completos de pokemon
export interface PokeDetails {
  id: number;
  name: string;
  abilities: string[];
  types: string[];
  stats: Stat[];
  image: string;
  sprite: string;
}



//Interface de datos de un equipo
export interface Team {
  id: number;
  name: string;
  pokemon: Pokemon[];
}

//Interface de estructura de stats
interface Stat {
  base_stat: number;
  name: string;
}

//Interface de response basica de pokeapi
export interface ApiResponse {
  name: string;
  url: string;
}

//Interface de response detallada de pokeapi
export interface DetailedAPIResponse {
  id: number;
  name: string;
  abilities: { ability: { name: string } }[];
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
    versions: {
      'generation-viii': {
        icons: {
          front_default: string;
        };
      };
    };
  };
}

export interface MemberCardProps {
  pokemon: {
    name: string;
    sprite: string;
  };
  handleAdd: (name: string) => void;
}