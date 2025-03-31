import { useEffect, useState } from "react";
import PokeCard from "../../components/Cards/PokeCard";
import Navbar from "../../components/Navigation/Navbar";
import {
  getAbilities,
  getAllPokemon,
  getByAbility,
  getByType,
  getTypes,
} from "../../services/pokemonService";
import { ApiResponse, Pokemon } from "../../interfaces/pokemonInterface";
function Home() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>();
  const [page, setPage] = useState<number>(0);
  const [searchInput, setSearchInput] = useState<string>("");
  const [types, setTypes] = useState<ApiResponse[]>([]);
  const [abilities, setAbilities] = useState<ApiResponse[]>([]);

  //Recoleccion de datos ---------------------------------------------------------------------------------------------------
  //Funcion que recolecta datos iniciales
  const getData = async (): Promise<void> => {
    try {
      const response: Pokemon[] = await getAllPokemon({
        // Recibe parametros de busqueda y paginacion
        page: page,
        search: searchInput,
      });
      setPokemonList(response);
    } catch (error) {
      console.log(error);
    }
  };

  //Funcion que recolecta datos filtrados por tipo
  const filterByType = async (type: number): Promise<void> => {
    try {
      const response: Pokemon[] = await getByType(type); //Recibe el tipo a filtrar
      setPokemonList(response);
    } catch (error) {
      console.log(error);
    }
  };

  //Funcion que recolecta datos filtrados por habilidad
  const filterByAbility = async (ability: string): Promise<void> => {
    try {
      const response: Pokemon[] = await getByAbility(ability); //Recibela habilidad a filtrar
      setPokemonList(response);
    } catch (error) {
      console.log(error);
    }
  };

  //Poblado de selects -------------------------------------------------------------------------------------------------
  //Funcion que recolecta los tipos disponibles
  const getTypeList = async (): Promise<void> => {
    try {
      const response: ApiResponse[] = await getTypes();
      setTypes(response);
    } catch (error) {
      console.log(error);
    }
  };

  //Funcion que recolecta las habilidades disponibles
  const getAbilityList = async (): Promise<void> => {
    try {
      const response: ApiResponse[] = await getAbilities();
      setAbilities(response);
    } catch (error) {
      console.log(error);
    }
  };

  //Manejo de paginacion -------------------------------------------------------------------------------------------------
  const handleNext = (): void => {
    setPage(page + 20); //Agrega un offset de 20 pokemon
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePrev = (): void => {
    if (page > 0) {
      //Solo disponible si no se encuentra en la pagina inicial
      setPage(page - 20); //Resta un offset de 20 pokemon
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  //Manejo de eventos -------------------------------------------------------------------------------------------------
  //Manejo de cambios en el input
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchInput(event.target.value);
  };

  //Manejo de seleccion de tipo
  const handleTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedType: number = parseInt(event.target.value);
    filterByType(selectedType);
  };

  //Manejo de seleccion de habilidad
  const handleAbilityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedAbility: string = event.target.value;
    filterByAbility(selectedAbility);
  };

  //Manejo de busqueda
  const handleSearch = (): void => {
    getData();
    setSearchInput("");
  };

  //Use effects -------------------------------------------------------------------------------------------------
  //Realiza la recolecta de datos cada vez que la pagina cambia
  useEffect(() => {
    getData();
  }, [page]);

  //Realiza la poblacion de selects cada vez que se monta el componente
  useEffect(() => {
    getTypeList();
    getAbilityList();
  }, []);

  return (
    <div className=" h-screen min-h-screen flex flex-col items-center ">
      <Navbar />
      <div className="w-full flex flex-col items-center ">
        {/* Buscador de pokemon */}
        <div className="lg:w-1/2 flex my-5">
          <input
            type="text"
            name="search"
            placeholder="Charmander"
            id="search"
            value={searchInput}
            onChange={handleInputChange}
            className="w-full p-2 bg-white rounded-md rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-[#cc285f]  rounded-md rounded-l-none px-3 text-white"
          >
            Search
          </button>
        </div>

        <div className="w-full flex justify-center gap-5">
          {/* Selector de tipos */}
          <div>
            <label htmlFor="pokemonType" className="block  text-white">
              Select Pokémon Type:
            </label>
            <select
              onChange={handleTypeChange}
              id="pokemonType"
              className="w-full p-2 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {types.map((type, index) => (
                <option key={type.name} value={index + 1}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          {/* Selector de habilidades */}
          <div>
            <label htmlFor="pokemonAbility" className="block  text-white">
              Select Pokémon Ability:
            </label>
            <select
              onChange={handleAbilityChange}
              id="pokemonAbility"
              className="w-full p-2 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {abilities.map((ability) => (
                <option key={ability.name} value={ability.name}>
                  {ability.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Listado de pokemon */}
        {pokemonList?.length == 0 ? (
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
                sprite={pokemon.sprite}
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
