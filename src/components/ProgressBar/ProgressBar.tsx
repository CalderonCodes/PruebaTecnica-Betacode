function ProgressBar({ value}: { value: number }) {
  const width = (value / 255) * 100;
  return (
    <div className="flex justify-center w-full gap-2">
      <p className="font-bold">HP</p>
      <div className="w-2/3 bg-gray-200 rounded-lg h-6 overflow-hidden">
        <div
          className="bg-[#ca215a]  h-full transition-all duration-300"
          style={{ width: `${width}%` }} // Ajusta el tamaño dinámicamente
        ></div>
      </div>
      <p>200</p>
    </div>
  );
}

export default ProgressBar;
