function ProgressBar({ value , name}: { value: number , name: string }) {

  //El valor de stat mas alto es 255
  const width = (value / 255) * 100;
  
  return (
    <div className="grid grid-cols-[35%_55%_10%] lg:grid-cols-[15%_60%_10%] w-full gap-2 justify-center">
      <p className="font-bold ">{name}</p>
      <div className=" bg-gray-200 rounded-lg h-6 overflow-hidden">
        <div
          className="bg-[#ca215a]  h-full transition-all duration-300"
          style={{ width: `${width}%` }} // Ajusta el tamaño dinámicamente
        ></div>
      </div>
      <p className="">{value}</p>
    </div>
  );
}

export default ProgressBar;
