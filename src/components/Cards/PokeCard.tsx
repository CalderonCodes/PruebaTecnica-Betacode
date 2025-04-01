import { Link } from "react-router-dom";
import { Pokemon } from "../../interfaces/pokemonInterface";
import { capitalizeFirstLetter } from "../../utils/functions";


export default function PokeCard({name, image}: Pokemon) {
    return (
      <Link to={`/pokemon/${name}`} className='bg-gradient-to-b from-[#2e2e2e] to-[#191919]  flex flex-col items-center w-40 lg:w-42 h-52 p-2 rounded-xl
       overflow-hidden shadow-xl  shadow-white/5 hover:shadow-none hover:brightness-95 border-[#cc285f] border-2'>
          <figure className="w-full h-3/4 justify-center flex p-5 bg-[linear-gradient(to_bottom,rgba(84,84,84,0.5),rgba(31,31,31,1))] rounded-full ">
              <img src={image} alt="" className=" object-contain"/>
          </figure>
          <p className="text-white font-extrabold">{capitalizeFirstLetter(name)}</p>
      </Link>
    )
  }
  