
import PokeCard from '../components/Cards/PokeCard'
import Navbar from '../components/Navigation/Navbar'

function Home() {
  return (
    <div className=' h-screen min-h-screen flex flex-col items-center '>
        <Navbar/>
        <div className="w-full flex flex-col items-center ">

        {/* Buscador de pokemon */}
        <div className="lg:w-1/2 flex my-5">
          <input
            type="text"
            name=""
            placeholder="Charmander"
            id=""
            className="w-full p-2 bg-white rounded-md rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="bg-[#cc285f]  rounded-md rounded-l-none px-3 text-white"
          >
            Search
          </button>
        </div>
 
        {/* Selector de tipos */}
          <div>
            <label htmlFor="pokemonType" className="block  text-white">
              Select Pokémon Type:
            </label>
            <select
              id="pokemonType"
              className="w-full p-2 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            </select>
          </div>
 
        {/* Listado de pokemon */}
        <div className="w-full my-5 grid grid-cols-2 lg:grid-cols-6 gap-5 place-items-center">
            <PokeCard/>   
            <PokeCard/>
            <PokeCard/>     
            <PokeCard/>  
            <PokeCard/>   
            <PokeCard/>
            <PokeCard/>     
            <PokeCard/>  
        </div>
      </div>

      {/* Paginacion */}
      <div className="flex py-5 gap-1">
        <button
          className='bg-[#cc285f] rounded-md rounded-r-none p-3 text-white font-bold'
        >
          Anterior
        </button>
        <button
          className='bg-[#cc285f] rounded-md rounded-l-none p-3 text-white font-bold'
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}

export default Home