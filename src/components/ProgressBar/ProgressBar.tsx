function ProgressBar({ value, name }: { value: number; name: string }) {
  // Mapeo de nombres de stats a abreviaciones
  const statMap: { [key: string]: string } = {
    hp: "HP",
    attack: "Atk",
    defense: "Def",
    "special-attack": "Sp. Atk",
    "special-defense": "Sp. Def",
    speed: "Spd",
  };

  // Convertimos el nombre a minúsculas para hacer la comparación más robusta
  const normalizedName = name.toLowerCase();

  // Si el nombre existe en el mapeo, usamos la abreviatura, si no, usamos el nombre original
  const displayName = statMap[normalizedName] || name;

  // El valor máximo es 255, se calcula el ancho de la barra en porcentaje
  const width = (value / 255) * 100;

  return (
    <div className="grid grid-cols-[15%_65%_15%] lg:grid-cols-[15%_70%_15%] w-full gap-2 justify-center">
      <p className="font-bold text-sm text-center lg:text-md">{displayName}</p>
      <div className="bg-gray-200 rounded-lg h-6 overflow-hidden">
        <div
          className="bg-[#ca215a] h-full transition-all duration-300"
          style={{ width: `${width}%` }} // Ajusta el tamaño dinámicamente
        ></div>
      </div>
      <p className="text-center lg:text-center">{value}</p>
    </div>
  );
}

export default ProgressBar;
