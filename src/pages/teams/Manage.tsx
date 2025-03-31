import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Pokemon, Team, TeamPokemon } from "../../interfaces/pokemonInterface";
import Navbar from "../../components/Navigation/Navbar";
import { getAllPokemon, getPokemon } from "../../services/pokemonService";

function Manage() {
  const { id } = useParams<{ id: string }>(); // Obtener ID de la URL
  const [teams, setTeams] = useState<Team[]>([]);
  const [team, setTeam] = useState<Team | null>(null);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>();
  const [searchInput, setSearchInput] = useState<string>("");
  const [newMember, setNewMember] = useState<TeamPokemon>();
  const [page, setPage] = useState<number>(0);
  const [tabChange, setTabChange] = useState<boolean>(false)

  const getData = async (): Promise<void> => {
    try {
      const response: Pokemon[] = await getAllPokemon({
        page: page,
        search: searchInput,
      });
      setPokemonList(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getPokemonData = async (name: string): Promise<void> => {
    try {
      const response = await getPokemon(name);
      if (response) {
        const pokeData: TeamPokemon = {
          id: response.id,
          name: response.name,
          image:
            response.sprites.versions["generation-viii"].icons.front_default,
        };
        setNewMember(pokeData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchInput(event.target.value);
  };

  const handleTabChange = (): void => {
    setTabChange(!tabChange)
  };

  const handleSearch = (): void => {
    getData();
    setSearchInput("");
  };

  const handleAdd = (name: string): void => {
    getPokemonData(name);
  };

  const handleNext = (): void => {
    setPage(page + 20);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  console.log(page);

  const handlePrev = (): void => {
    if (page > 0) {
      setPage(page - 20);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    const savedTeams = localStorage.getItem("teams");
    if (savedTeams) {
      const parsedTeams: Team[] = JSON.parse(savedTeams);
      setTeams(parsedTeams);
      const foundTeam = parsedTeams.find((t) => t.id === Number(id));
      setTeam(foundTeam || null);
    }
  }, [id]);

  // Función para eliminar un Pokémon del equipo
  const removePokemon = (pokemonName: string) => {
    if (!team) return;

    // Filtrar el Pokémon a eliminar
    const updatedPokemon = team.pokemon.filter((p) => p.name !== pokemonName);
    const updatedTeam = { ...team, pokemon: updatedPokemon };

    // Actualizar la lista de equipos
    const updatedTeams = teams.map((t) => (t.id === team.id ? updatedTeam : t));

    // Guardar en el estado y localStorage
    setTeams(updatedTeams);
    setTeam(updatedTeam);
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
  };

  if (!team) {
    return <p className="text-white">Equipo no encontrado</p>;
  }

  return (
    <div className="h-screen  w-full flex flex-col gap-3 items-center text-white">
      <Navbar />
      <div className="flex gap-5 ">
        <h1 className="text-3xl font-bold">{team.name}</h1>
        <button className="bg-[#cc285f] text-white px-5 py-1 rounded font-bold">
          Delete
        </button>
      </div>
      <div className="flex lg:hidden gap-2">
        <button
        onClick={handleTabChange}
         className="bg-[#cc285f] text-white px-5 py-1 rounded font-bold">
          Change Tab
        </button>
      </div>
      <div className="grid-cols-1 lg:grid-cols-2 grid w-11/12 overflow-hidden justify-center">
        <div className={`w-full ${!tabChange ? "flex" : "hidden"} lg:flex flex-col gap-2 lg:px-10 py-5`}>
          {team.pokemon.map((pokemon) => (
            <div
              key={pokemon.name}
              className="flex items-center gap-3 w-full bg-white text-black  justify-between p-2 rounded"
            >
              <figure className="w-16 h-16 lg:w-18  lg:h-18  flex justify-center items-center bg-[#cc285f] rounded-full ml-2">
                <img
                  className="w-full h-full object-contain content-center mb-3 "
                  src={pokemon.image}
                  alt=""
                />
              </figure>
              <p>{pokemon.name}</p>
              <button
                onClick={() => removePokemon(pokemon.name)}
                className="bg-[#cc285f] text-white px-2 py-1 rounded "
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        {pokemonList && (
          <div className={`w-full ${tabChange ? "flex" : "hidden"} flex flex-col gap-2 lg:px-10`}>
            <div className="lg:w-full flex my-5">
              <input
                type="text"
                name="search"
                placeholder="Charmander"
                id="search"
                value={searchInput}
                onChange={handleInputChange}
                className="w-full p-2 bg-white rounded-md rounded-r-none text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSearch}
                className="bg-[#cc285f]  rounded-md rounded-l-none px-3 text-white"
              >
                Search
              </button>
              {/* Paginacion */}
              <div className="flex gap-1 ml-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className={`${
                    page === 0 ? "invisible" : "block"
                  } bg-[#cc285f] rounded-md rounded-r-none p-1 text-white font-bold`}
                >
                  Anterior
                </button>

                <button
                  onClick={handleNext}
                  type="button"
                  className="bg-[#cc285f] rounded-md rounded-l-none p-1 text-white font-bold"
                >
                  Siguiente
                </button>
              </div>
            </div>

            <div
              className={`flex flex-col gap-2 max-h-1/4  lg:h-[27%]  ${pokemonList.length > 1 && "overflow-y-scroll"} 
                          [&::-webkit-scrollbar]:w-2
                        [&::-webkit-scrollbar-track]:bg-gray-100
                        [&::-webkit-scrollbar-thumb]:bg-gray-300
                        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500`}
            >
              {pokemonList.map((pokemon) => (
                <div
                  key={pokemon.name}
                  className="flex items-center gap-3 w-full bg-white text-black  justify-between p-2 rounded"
                >
                  <figure className="w-16 h-16 lg:w-20  lg:h-16  flex justify-center items-center bg-[#cc285f] rounded-full ml-2">
                    <img
                      className="w-full h-full object-contain content-center mb-3 "
                      src={pokemon.sprite}
                      alt=""
                    />
                  </figure>
                  <p>{pokemon.name}</p>
                  <button
                    onClick={() => handleAdd(pokemon.name)}
                    className="bg-[#cc285f] text-white px-2 py-1 rounded "
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Manage;
