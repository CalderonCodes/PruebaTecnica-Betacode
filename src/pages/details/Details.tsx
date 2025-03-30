import React from "react";
import Navbar from "../../components/Navigation/Navbar";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

function Details() {
  return (
    <div className="h-screen min-h-screen flex flex-col items-center text-white ">
      <Navbar />
      <div className="flex flex-col lg:flex-row-reverse w-full h-full">
        <figure className="w-full h-1/3 justify-center flex p-5 bg-[#ca215a] rounded-b-full lg:h-full  lg:w-1/2">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/255.png"
            alt=""
            className=" object-contain "
          />
        </figure>

        <div className="w-full flex flex-col justify-center items-center gap-3 lg:gap-5">
          <h1 className="text-3xl font-bold lg:text-5xl">Reshiram</h1>
          {/* Tipos */}
          <section className="w-full flex justify-center gap-5"> 
            <div className="w-20 h-6 bg-red-500 font-bold text-lg border border-white rounded-sm flex items-center justify-center ">
                FIRE
            </div>
            <div className="w-20 h-6 bg-red-500 font-bold text-lg border border-white rounded-sm flex items-center justify-center ">
                FIRE
            </div>
          </section>

          {/* Habilidades */}
          <section className="w-full flex flex-col items-center">
            <h2 className="font-bold text-xl lg:text-3xl">Abilities</h2>
            <div className="flex gap-5 lg:text-xl">
                <p>Sand-vel</p>
                <p>Sand-vel</p>
                <p>Sand-vel</p>
            </div>
          </section>

          {/* Estadisticas */}
          <section className="w-full flex flex-col items-center">
          <h2 className="font-bold text-xl">Stats</h2>
          <div className="w-full px-5 flex flex-col gap-2">
            <ProgressBar value={200} />
            <ProgressBar value={200} />
            <ProgressBar value={200} />
            <ProgressBar value={200} />
            <ProgressBar value={200} />
            <ProgressBar value={200} />
          </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Details;
