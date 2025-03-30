import { Link } from "react-router-dom";
import { Pokemon } from "../../interfaces/pokemonInterface";


export default function PokeCard({name, image}: Pokemon) {
    return (
      <Link to={`/pokemon/${name}`} className='bg-white flex flex-col items-center w-40 lg:w-48 h-48 rounded-xl shadow-[5px_5px_0px_0px_rgba(221,_221,_221,_1)] hover:shadow-none hover:brightness-95'>
          <figure className="w-full h-3/4 justify-center flex p-5 bg-[#ca215a]  rounded-xl ">
              <img src={image} alt="" className=" object-contain"/>
          </figure>
          <p className="text-[#cc285f] font-extrabold">{name}</p>
      </Link>
    )
  }
  