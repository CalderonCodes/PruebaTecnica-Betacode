function Navbar() {
  return (
    <nav className="bg-[#191919] p-4 w-full shadow-2xl shadow-black-700/50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold flex gap-2 items-center">
          <img src={"/public/pokeball.svg"} className="h-6" alt="" />
          <h1>Pokedex</h1>
        </div>

        <div className="flex space-x-4 font-bold">
          <a href="/" className="hover:text-gray-300 text-white">
            Home
          </a>
          <a href="/teams" className="hover:text-gray-300 text-white">
            Teams
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
