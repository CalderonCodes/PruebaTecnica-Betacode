export default function PokeCard() {
    return (
      <div className='bg-white flex flex-col items-center w-40 lg:w-48 h-48 rounded-xl shadow-[5px_5px_0px_0px_rgba(221,_221,_221,_1)] hover:shadow-none hover:brightness-95'>
          <figure className="w-full h-3/4 justify-center flex p-5 bg-[#ca215a]  rounded-xl ">
              <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png' alt="" className=" object-contain"/>
          </figure>
          <p className="text-[#cc285f] font-extrabold">Jigglypuff</p>
      </div>
    )
  }
  