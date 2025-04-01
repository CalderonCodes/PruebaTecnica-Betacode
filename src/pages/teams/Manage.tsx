import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pokemon, Team } from "../../interfaces/pokemonInterface";
import Navbar from "../../components/Navigation/Navbar";
import { getAllPokemon, getPokemon } from "../../services/pokemonService";
import NewMemberCard from "../../components/Cards/NewMemberCard";
import MemberCard from "../../components/Cards/MemberCard";

function Manage() {
  const { id } = useParams<{ id: string }>(); // Obtener parametro de la url

  //Definicion de estados---------------------------------------------------------------------------------------------------
  const [teams, setTeams] = useState<Team[]>([]);
  const [team, setTeam] = useState<Team | null>(null);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>();
  const [searchInput, setSearchInput] = useState<string>("");
  const [newMember, setNewMember] = useState<Pokemon>();
  const [page, setPage] = useState<number>(0);
  const [tabChange, setTabChange] = useState<boolean>(false);
  const navigate = useNavigate();
  const [editing, setEditing] = useState<boolean>(false);
  const [teamName, setTeamName] = useState<string>(team?.name || "");

  //Recoleccion de datos ---------------------------------------------------------------------------------------------------
  //Funcion que recolecta datos iniciales
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

  //Funcion que recolecta datos del pokemon a agregar
  const getPokemonData = async (name: string): Promise<void> => {
    try {
      const response = await getPokemon(name);
      if (response) {
        setNewMember({
          id: response.id,
          name: response.name,
          image: response.sprite,
          sprite: response.sprite,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Manejo de paginacion -------------------------------------------------------------------------------------------------
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

  //Manejo de eventos -------------------------------------------------------------------------------------------------
  //Manejo de cambios en el input
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchInput(event.target.value);
  };

  //Manejo de cambio de pestaña en mobile
  const handleTabChange = (): void => {
    setTabChange(!tabChange);
  };

  //Manejo de busqueda
  const handleSearch = (): void => {
    getData();
    setSearchInput("");
  };

  //Manejo de agregar pokemon a equipo
  const handleAdd = (name: string): void => {
    getPokemonData(name);
  };

  //Manejo del input de nombre de equipo
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value);
  };

  //Manejo de edicion
  const handleEditName = () => {
    setEditing(true);
  };

  //Guardar nuevo nombre
  const handleSaveName = () => {
    if (!team || teamName.trim() === "") return;

    const updatedTeam = { ...team, name: teamName };
    const updatedTeams = teams.map((t) => (t.id === team.id ? updatedTeam : t));

    setTeams(updatedTeams);
    setTeam(updatedTeam);
    localStorage.setItem("teams", JSON.stringify(updatedTeams));

    setEditing(false);
  };

  //Funcion para agregar pokemon al equipo
  const addPokemonToTeam = () => {
    if (!team || !newMember) return; //Si no existe equipo o pokemon seleccionado, no se ejecuta nada

    if (team.pokemon.some((p) => p.name === newMember.name)) {
      alert("This pokemon is already in the team"); //Valida que el pokemon ya este en el equipo
      return;
    }

    if (team.pokemon.length >= 6) {
      alert("The team is full. You can't add more pokemon"); //Valida que el equipo no este completo
      return;
    }

    //Actualiza miembros del equipo
    const updatedTeam = { ...team, pokemon: [...team.pokemon, newMember] };
    const updatedTeams = teams.map((t) => (t.id === team.id ? updatedTeam : t));
    setTeams(updatedTeams);
    setTeam(updatedTeam);

    //Inserta el equipo al local storage
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
    setNewMember(undefined);
  };

  // Función para eliminar un Pokémon del equipo
  const removePokemon = (pokemonName: string) => {
    if (!team) return;

    // Filtra el Pokémon a eliminar
    const updatedPokemon = team.pokemon.filter((p) => p.name !== pokemonName);
    const updatedTeam = { ...team, pokemon: updatedPokemon };

    // Actualiza la lista de equipos
    const updatedTeams = teams.map((t) => (t.id === team.id ? updatedTeam : t));

    // Actualiza el equipo en el local storage
    setTeams(updatedTeams);
    setTeam(updatedTeam);
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
  };

  const handleDeleteTeam = () => {
    if (!team) return; //Si el equipo no existe no se ejecuta

    const confirmDelete = window.confirm(
      //Ventana de confirmacion
      `¿Estás seguro de que quieres eliminar el equipo "${team.name}"?`
    );
    if (!confirmDelete) return;

    //Busca el equipo por su id en la lista de equipos
    const updatedTeams = teams.filter((t) => t.id !== team.id);
    setTeams(updatedTeams);
    //Lo elimina y actualiza local storage
    localStorage.setItem("teams", JSON.stringify(updatedTeams));

    navigate("/teams"); // Redirige a la lista de equipos
  };

  //Use effects -------------------------------------------------------------------------------------------------
  //Realiza la recolecta de datos cada vez que la pagina cambia
  useEffect(() => {
    getData();
  }, [page]);

  //Obtiene pokemon del local storage
  useEffect(() => {
    const savedTeams = localStorage.getItem("teams");
    if (savedTeams) {
      const parsedTeams: Team[] = JSON.parse(savedTeams);
      setTeams(parsedTeams);
      const foundTeam = parsedTeams.find((t) => t.id === Number(id));
      setTeam(foundTeam || null);
    }
  }, [id]);

  //Realiza logica de agregar pokemon a equipo cada vez que cambia el pokemon a agregar
  useEffect(() => {
    if (newMember) {
      addPokemonToTeam();
    }
  }, [newMember]);

  if (!team) {
    return <p className="text-white">Equipo no encontrado</p>;
  }

  return (
    <div className="h-screen  w-full flex flex-col gap-3 items-center text-white">
      <Navbar />
      <div className="flex gap-5 items-center">
        <div className="flex flex-col lg:flex-row gap-2 items-center ">
          {editing ? (
            <input
              type="text"
              value={teamName}
              onChange={handleNameChange}
              className="w-full px-2 py-1  bg-[#393939] rounded-md border-gray-700 border-2 text-white lg:rounded-r-none
                 focus:outline-none focus:ring-2 focus:ring-[#cc285f] "
            />
          ) : (
            <h1 className="text-3xl font-bold">{team.name}</h1>
          )}
          <div className="flex gap-2">
            {editing ? (
              <button
                onClick={handleSaveName}
                className="bg-[#cc285f] hover:brightness-95 lg:rounded-l-none text-white px-5  py-1 rounded-md font-bold"
              >
                Save
              </button>
            ) : (
              <button
                onClick={handleEditName}
                className="bg-[#cc285f] hover:brightness-95 text-white px-5 py-1 rounded-md font-bold"
              >
                Edit
              </button>
            )}
                      <button
            onClick={handleDeleteTeam}
            className="bg-[#cc285f] hover:brightness-95 text-white px-5 py-1 rounded-md font-bold"
          >
            Delete
          </button>
          <div className="flex lg:hidden gap-2">
        <button
          onClick={handleTabChange}
          className="bg-[#cc285f] text-white px-5 py-1 rounded-md font-bold"
        >
          {!tabChange? "Add pokemon": "Manage"}
        </button>
      </div>
          </div>


        </div>
      </div>
    
      <div className="grid-cols-1 lg:grid-cols-2 grid w-11/12 overflow-hidden justify-center">
        <div
          className={`w-full ${
            !tabChange ? "flex" : "hidden"
          } lg:flex flex-col gap-2 lg:px-10 py-5`}
        >
          {team.pokemon.map((pokemon) => (
            <MemberCard
              key={pokemon.name}
              handleAdd={removePokemon}
              pokemon={pokemon}
            />
          ))}
        </div>
        {pokemonList && (
          <div
            className={`w-full ${
              tabChange ? "flex" : "hidden"
            } lg:flex flex-col gap-2 lg:px-10`}
          >
            <div className="lg:w-full flex my-5">
              <input
                type="text"
                name="search"
                placeholder="Charmander"
                id="search"
                value={searchInput}
                onChange={handleInputChange}
                className="w-full p-2  bg-[#393939] rounded-md border-gray-700 border-2 text-white rounded-r-none
                 focus:outline-none focus:ring-2 focus:ring-[#cc285f] "
              />
              <button
                onClick={handleSearch}
                className="bg-[#cc285f] hover:brightness-95 rounded-md rounded-l-none px-3 font-bold text-white"
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
                  className="bg-[#cc285f] hover:brightness-95 rounded-md rounded-l-none p-1 text-white font-bold"
                >
                  Siguiente
                </button>
              </div>
            </div>

            <div
              className={`flex flex-col gap-2 max-h-1/4  lg:h-[27%] py-2  ${
                pokemonList.length > 1 && "overflow-y-scroll"
              } 
                          [&::-webkit-scrollbar]:w-2
                        [&::-webkit-scrollbar-track]:bg-gray-100
                        [&::-webkit-scrollbar-thumb]:bg-gray-300
                        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500`}
            >
              {pokemonList.map((pokemon) => (
                <NewMemberCard
                  key={pokemon.name}
                  handleAdd={handleAdd}
                  pokemon={pokemon}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Manage;
