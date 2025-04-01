function TypeCard({ name }: { name: string }) {
  //Mapeo de color de cartas de tipo
  const typeColors: { [key: string]: string } = {
    normal: "bg-gray-400",
    fire: "bg-red-500",
    water: "bg-blue-500",
    electric: "bg-yellow-500",
    grass: "bg-green-500",
    ice: "bg-cyan-400",
    fighting: "bg-orange-700",
    poison: "bg-purple-500",
    ground: "bg-yellow-700",
    flying: "bg-indigo-400",
    psychic: "bg-pink-500",
    bug: "bg-lime-500",
    rock: "bg-yellow-600",
    ghost: "bg-indigo-800",
    dragon: "bg-purple-700",
    dark: "bg-gray-800",
    steel: "bg-gray-500",
    fairy: "bg-pink-300",
  };

  const typeColor = typeColors[name || "bg-gray-200"];
  return (
    <div
      className={`w-24 h-8 lg:w-32 lg:h-8 ${typeColor}  font-bold text-lg border border-white rounded-sm flex items-center justify-center`}
    >
      {name.toUpperCase()}
    </div>
  );
}

export default TypeCard;
