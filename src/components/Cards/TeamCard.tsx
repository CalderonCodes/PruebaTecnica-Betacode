
function TeamCard() {
  return (
    <div className="w-full flex flex-col p-2 items-center justify-center rounded-2xl gap-2  shadow-[5px_5px_0px_0px_rgba(221,_221,_221,_1)]  bg-white">
        <h1 className="text-lg font-bold">Nombre del equipo</h1>
      <div className="w-full flex justify-center  lg:gap-5">
        <figure className="w-16 h-16 lg:w-20  lg:h-20  flex justify-center items-center bg-[#cc285f] rounded-full ml-2">
          <img
            className="w-full h-full object-contain content-center mb-3 "
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/45.png"
            alt=""
          />
        </figure>

        <figure className="w-16 h-16 lg:w-20  lg:h-20  flex justify-center items-center bg-[#cc285f] rounded-full ml-2">
          <img
            className="w-full h-full object-contain content-center mb-3 "
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/445.png"
            alt=""
          />
        </figure>

        <figure className="w-16 h-16 lg:w-20  lg:h-20  flex justify-center items-center bg-[#cc285f] rounded-full ml-2">
          <img
            className="w-full h-full object-contain content-center mb-3 "
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/122.png"
            alt=""
          />
        </figure>

        <figure className="w-16 h-16 lg:w-20  lg:h-20  flex justify-center items-center bg-[#cc285f] rounded-full ml-2">
          <img
            className="w-full h-full object-contain content-center mb-3 "
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/165.png"
            alt=""
          />
        </figure>

        <figure className="w-16 h-16 lg:w-20  lg:h-20 flex justify-center items-center bg-[#cc285f] rounded-full ml-2">
          <img
            className="w-full h-full object-contain content-center mb-3 "
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/631.png"
            alt=""
          />
        </figure>

        <figure className="w-16 h-16 lg:w-20  lg:h-20  flex justify-center items-center bg-[#cc285f] rounded-full ml-2">
          <img
            className="w-full h-full object-contain content-center mb-3 "
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/365.png"
            alt=""
          />
        </figure>
      </div>
      <div className="flex gap-4">
        <button className="bg-[#cc285f] text-white font-bold text-lg px-3 py-1 rounded-xl">Edit</button>
        <button className="bg-[#cc285f] text-white font-bold text-lg px-3 py-1 rounded-xl">Delete</button>
      </div>
    </div>
  );
}

export default TeamCard;
