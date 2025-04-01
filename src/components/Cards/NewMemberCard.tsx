import { MemberCardProps } from "../../interfaces/pokemonInterface";
import { capitalizeFirstLetter } from "../../utils/functions";

function NewMemberCard({ pokemon, handleAdd }: MemberCardProps) {
  return (
    <div
      className="flex items-center gap-3 w-full  shadow-white/5 hover:shadow-none bg-gradient-to-b from-[#2e2e2e] to-[#191919]
                 border-[#cc285f] border-2 text-white justify-between p-2 py-1 lg:py-2 rounded-2xl"
    >
      <figure className="w-16 h-16 lg:w-16  lg:h-16  flex justify-center items-center lg:border-2 lg:border-[#cc285f] lg:bg-[linear-gradient(to_bottom,rgba(84,84,84,0.5),rgba(31,31,31,1))] rounded-full ml-2">
        <img
          className="w-full h-full object-contain content-center mb-3 "
          src={pokemon.sprite}
          alt=""
        />
      </figure>
      <p className="font-bold text-lg">
        {capitalizeFirstLetter(pokemon.name)}
      </p>
      <button
        onClick={() => handleAdd(pokemon.name)}
        className="bg-[#cc285f] hover:brightness-95 text-white px-4 lg:px-4 font-bold py-1 rounded-md  mr-2"
      >
        Add
      </button>
    </div>
  );
}

export default NewMemberCard;
