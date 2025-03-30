import { useEffect, useState } from "react";
import PokeCard from "../components/Cards/PokeCard";
import Navbar from "../components/Navigation/Navbar";
import { getAllPokemon } from "../services/pokemonService";
import { Pokemon } from "../interfaces/pokemonInterface";
import Loader from "../components/Loader/Loader";

function Home() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const getData = async (): Promise<void> => {
    try {
      setLoading(true);
      const response: Pokemon[] = await getAllPokemon({ page: page });
      setPokemonList(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNext = (): void => {
    setPage(page + 20);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePrev = (): void => {
    if (page > 0) {
      setPage(page - 20);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  console.log(page);

  useEffect(() => {
    getData();
  }, [page]);

  console.log(pokemonList);
  return (
    <div className=" h-screen min-h-screen flex flex-col items-center ">
      <Navbar />
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
          <button className="bg-[#cc285f]  rounded-md rounded-l-none px-3 text-white">
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
          ></select>
        </div>

        {/* Listado de pokemon */}
        {loading && pokemonList?.length == 0 ? (
            <div className="w-full flex  justify-center  h-full">
              <h1 className="text-center text-3xl text-white p-5 font-bold">
                No se encontraron pokemon
              </h1>
            </div>
        ) : (
          <div className="w-full my-5 grid grid-cols-2 lg:grid-cols-5 gap-5 place-items-center">
            {pokemonList?.map((pokemon) => (
              <PokeCard
                key={pokemon.name}
                name={pokemon.name}
                image={pokemon.image}
              />
            ))}
          </div>
        )}
      </div>

      {/* Paginacion */}
      <div className="flex py-5 gap-1">
        {page > 0 && (
          <button
            type="button"
            onClick={handlePrev}
            className="bg-[#cc285f] rounded-md rounded-r-none p-3 text-white font-bold"
          >
            Anterior
          </button>
        )}

        <button
          type="button"
          onClick={handleNext}
          className="bg-[#cc285f] rounded-md rounded-l-none p-3 text-white font-bold"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Home;
