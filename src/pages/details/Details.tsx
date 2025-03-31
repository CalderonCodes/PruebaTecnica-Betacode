import { useEffect, useState } from "react";
import Navbar from "../../components/Navigation/Navbar";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { useParams } from "react-router-dom";
import { getPokemon } from "../../services/pokemonService";
import {
  PokeDetails,
  Team,
  TeamPokemon,
} from "../../interfaces/pokemonInterface";
import TypeCard from "../../components/Cards/TypeCard";
import { capitalizeFirstLetter } from "../../utils/functions";

function Details() {
  const { name } = useParams<{ name: string }>(); //Obtiene parametro de la url

  //Definicion de estados
  const [pokemon, setPokemon] = useState<PokeDetails>();
  const [teams, setTeams] = useState<Team[]>(() => {
    // Carga los equipos iniciales desde el localStorage
    const savedTeams = localStorage.getItem("teams");
    return savedTeams ? JSON.parse(savedTeams) : [];
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [pokemonAdd, setPokemonAdd] = useState<TeamPokemon>();

  //Recoleccion de datos ---------------------------------------------------------------------------------------------------
  //Funcion que recolecta datos iniciales
  const getData = async (): Promise<void> => {
    try {
      if (!name) return;

      const pokeData = await getPokemon(name);

      if (pokeData) {
        setPokemon(pokeData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //Manejo de eventos -------------------------------------------------------------------------------------------------
  //Manejo de agregar al equipo
  const handleAddTeam = () => {
    if (pokemon) { //Valida que el estado este seteado
      setPokemonAdd({ //Setea el DTO
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprite,
      });
    }
    setShowModal(true);
    console.log(teams);
  };

  //Manejo de modal
  const handleCloseModal = () => {
    setShowModal(false); // Oculta el modal
  };

  //Use effects -------------------------------------------------------------------------------------------------
  //Recolecta datos de pokemon al montar el componente
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="h-screen min-h-screen flex flex-col items-center text-white  ">
      <Navbar />
      {!pokemon ? (
        <p> Cargando</p>
      ) : (
        <div className="flex flex-col lg:flex-row-reverse w-full h-full">
          <figure className="w-full h-1/3 justify-center flex p-5 bg-[#ca215a]  rounded-b-full lg:rounded-full lg:h-full  lg:w-2/3">
            <img src={pokemon.image} alt="" className=" object-contain " />
          </figure>

          <div className="w-full flex flex-col justify-center items-center gap-3 lg:gap-5">
            <div className="w-full flex justify-center text-4xl lg:text-5xl font-bold gap-5">
              <h1>#{pokemon.id} </h1>
              <h1 className="text-3xl font-bold lg:text-5xl">
                {capitalizeFirstLetter(pokemon.name)}
              </h1>
            </div>

            {/* Tipos */}
            <section className="w-full flex justify-center gap-5">
              {pokemon.types.map((type) => (
                <TypeCard name={type} />
              ))}
            </section>

            {/* Habilidades */}
            <section className="w-full flex flex-col items-center">
              <h2 className="font-bold text-xl lg:text-3xl">Abilities</h2>
              <div className="flex gap-5 lg:text-xl">
                {pokemon.abilities.map((ability) => (
                  <p>| {capitalizeFirstLetter(ability)} |</p>
                ))}
              </div>
            </section>

            {/* Estadisticas */}
            <section className="w-full flex flex-col items-center">
              <h2 className="font-bold text-xl">Stats</h2>
              <div className="w-full px-5 flex flex-col items-center justify-center  gap-2">
                {pokemon.stats.map((stat) => (
                  <ProgressBar
                    value={stat.base_stat}
                    name={capitalizeFirstLetter(stat.name)}
                  />
                ))}
              </div>
            </section>
            <button
              onClick={handleAddTeam}
              className="bg-[#cc285f] text-white font-bold text-lg px-3 py-1 rounded-xl"
            >
              Add to my team
            </button>
          </div>
        </div>
      )}
      {/* Modal ------------------------------------------------------------------------------------ */}
      {showModal && (
        <div className="fixed top-0 text-black left-0 w-full h-full flex justify-center items-center bg-black/70 shadow-[0px_5px_1px_rgba(221,_221,_221,_1),_0_5px_10px_rgba(204,_204,_204,_1)]">
          <div className="bg-white p-6 w-11/12 lg:w-1/3 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-4">Select a Team</h2>
            <div className="flex flex-col  gap-2">
              {teams.length > 0 ? (
                teams.map((team, index) => (
                  <div
                    key={index}
                    className="p-3  rounded-md flex justify-between items-center shadow-[0px_5px_1px_rgba(221,_221,_221,_1),_0_5px_10px_rgba(204,_204,_204,_1)]"
                  >
                    <span>{team.name}</span>
                    <span>{team.pokemon.length} / 6</span>
                    {team.pokemon.length > 5 ? (
                      ""
                    ) : (
                      <button
                        onClick={() => { 
                          // Se actualiza el estado de equipos actuales con la informacion del localstorage
                          const updatedTeams = [...teams];
                          // Se busca el equipo con el index actual
                          const teamIndex = updatedTeams.findIndex(
                            (t) => t.name === team.name
                          );

                          //Si el equipo existe y el pokemon esta seteado se agrega el pokemon al equipo
                          if (teamIndex !== -1 && pokemonAdd) {
                            updatedTeams[teamIndex].pokemon =
                            updatedTeams[teamIndex].pokemon || [];
                            updatedTeams[teamIndex].pokemon.push(pokemonAdd);

                            //Se actualiza el local storage
                            localStorage.setItem(
                              "teams",
                              JSON.stringify(updatedTeams)
                            );
                            setTeams(updatedTeams);
                            handleCloseModal();
                          } else {
                            alert("Invalid team");
                          }
                        }}
                        className="bg-[#cc285f] text-white px-3 py-1 rounded-md "
                      >
                        Add
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p>No teams found</p>
              )}
            </div>
            <button
              onClick={handleCloseModal}
              className="mt-4 bg-[#cc285f] text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
