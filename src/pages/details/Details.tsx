import { useEffect, useState } from "react";
import Navbar from "../../components/Navigation/Navbar";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { useParams } from "react-router-dom";
import { getPokemon } from "../../services/pokemonService";
import { PokeDetails,} from "../../interfaces/pokemonInterface";
import TypeCard from "../../components/Cards/TypeCard";

function Details() {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<PokeDetails>();

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getData = async (): Promise <void> => {
    try {
        
        if(!name){
            console.log('a')
            return;
        }
        const response = await getPokemon(name);
        if(response){
            const pokeData: PokeDetails = {
                name: response.name,
                abilities: response.abilities.map((ability: any)=> ability.ability.name),
                types: response.types.map((type: any)=> type.type.name),
                stats: response.stats.map((stat: any) => ({
                    base_stat: stat.base_stat,
                    name: stat.stat.name,
                  })),
                image: response.sprites.other["official-artwork"].front_default
            }
            setPokemon(pokeData)
        }
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    getData();
  },[])


  return (
    <div className="h-screen min-h-screen flex flex-col items-center text-white ">
      <Navbar />
      {
        !pokemon ? (<p> Cargando</p>) : (
            <div className="flex flex-col lg:flex-row-reverse w-full h-full">
            <figure className="w-full h-1/3 justify-center flex p-5 bg-[#ca215a]  rounded-b-full lg:rounded-full lg:h-full  lg:w-2/3">
              <img
                src={pokemon.image}
                alt=""
                className=" object-contain "
              />
            </figure>
    
            <div className="w-full flex flex-col justify-center items-center gap-3 lg:gap-5">
              <h1 className="text-3xl font-bold lg:text-5xl">{capitalizeFirstLetter(pokemon.name)}</h1>
              {/* Tipos */}
              <section className="w-full flex justify-center gap-5">
                {pokemon.types.map((type) => (
                    <TypeCard name={type}/>
                ))}
              </section>
    
              {/* Habilidades */}
              <section className="w-full flex flex-col items-center">
                <h2 className="font-bold text-xl lg:text-3xl">Abilities</h2>
                <div className="flex gap-5 lg:text-xl">
                    {pokemon.abilities.map((ability)=>(
                        <p>| {capitalizeFirstLetter(ability)} |</p>
                    ))}
                </div>
              </section>
    
              {/* Estadisticas */}
              <section className="w-full flex flex-col items-center">
                <h2 className="font-bold text-xl">Stats</h2>
                <div className="w-full px-5 flex flex-col items-center justify-center  gap-2">
                    {
                        pokemon.stats.map((stat)=> (
                            <ProgressBar value={stat.base_stat} name={capitalizeFirstLetter(stat.name)} />
                        ))
                    }
                </div>
              </section>
            </div>
          </div>
        )
      }
     
    </div>
  );
}

export default Details;
