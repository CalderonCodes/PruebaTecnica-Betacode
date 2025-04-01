import { Link } from "react-router-dom";
import { Team } from "../../interfaces/pokemonInterface";

function TeamCard({ pokemonTeam }: { pokemonTeam: Team }) {
  return (
    <Link to={`/teams/${pokemonTeam.id}`} className="w-full text-white flex flex-col p-2 items-center justify-center rounded-2xl gap-2  
    shadow-white/5 hover:shadow-none hover:brightness-95 border-[#cc285f] border-2  bg-gradient-to-b from-[#2e2e2e] to-[#191919]">
      <h1 className="text-lg font-bold ">{pokemonTeam.name}</h1>
      <div className="w-full flex justify-center gap-1 lg:gap-5">
        {pokemonTeam.pokemon.map((pokemon) => (
          <div className="flex flex-col items-center  justify-center w-1/6 lg:w-auto">
            <figure className="w-18 h-18 lg:w-24  lg:h-24  flex justify-center items-center lg:border-2 lg:border-[#cc285f] lg:bg-[linear-gradient(to_bottom,rgba(84,84,84,0.5),rgba(31,31,31,1))]  rounded-full ml-2">
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
