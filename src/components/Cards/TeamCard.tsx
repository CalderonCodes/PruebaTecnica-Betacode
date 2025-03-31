import { Link } from "react-router-dom";
import { Team } from "../../interfaces/pokemonInterface";

function TeamCard({ pokemonTeam }: { pokemonTeam: Team }) {
  return (
    <Link to={`/teams/${pokemonTeam.id}`} className="w-full flex flex-col p-2 items-center justify-center rounded-2xl gap-2  shadow-[5px_5px_0px_0px_rgba(221,_221,_221,_1)]  bg-white">
      <h1 className="text-lg font-bold text-black">{pokemonTeam.name}</h1>
      <div className="w-full flex justify-center gap-1 lg:gap-5">
        {pokemonTeam.pokemon.map((pokemon) => (
          <div className="flex flex-col items-center  justify-center w-1/6 lg:w-auto">
            <figure className="w-16 h-16 lg:w-20  lg:h-20  flex justify-center items-center lg:bg-[#cc285f] rounded-full ml-2">
              <img
                className="w-full h-full object-contain content-center mb-3 "
                src={pokemon.image}
                alt=""
              />
            </figure>
          </div>
        ))}
      </div>
    </Link>
  );
}

export default TeamCard;
