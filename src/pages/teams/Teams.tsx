import { useState } from "react";
import TeamCard from "../../components/Cards/TeamCard";
import Navbar from "../../components/Navigation/Navbar";
import { Team } from "../../interfaces/pokemonInterface";

function Teams() {
  const [teams, setTeams] = useState<Team[]>(() => {
    const savedTeams = localStorage.getItem("teams");
    return savedTeams ? JSON.parse(savedTeams) : [];
  });

  const addTeam = () => {
    const newTeam = {
      name: `Team ${teams.length + 1}`, // Nombre único basado en la longitud actual
      pokemon: [], // Arreglo vacío de miembros
    };

    const updatedTeams = [...teams, newTeam];
    setTeams(updatedTeams);

    // Guarda los equipos en el localStorage
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
  };

  return (
    <div className=" h-screen min-h-screen flex flex-col gap-5 items-center text-white ">
      <Navbar />
      <h1 className="font-bold text-3xl">My Teams</h1>
      <button
        onClick={addTeam}
        className="bg-[#cc285f] text-white font-bold text-lg px-3 py-1 rounded-xl"
      >
        New Team
      </button>
      <div className="w-full grid lg:grid-cols-2 grid-cols-1 items-center px-2 gap-5">
        {teams.map((team) => (
          <TeamCard key={team.name} pokemonTeam={team} />
        ))}
      </div>
    </div>
  );
}

export default Teams;
