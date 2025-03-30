function Navbar() {
  return (
    <nav className="bg-[#ca215a] p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Pokedex</div>

        <div className="flex space-x-4">
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
