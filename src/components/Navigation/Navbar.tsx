function Navbar() {
  return (
    <nav className="bg-[#ca215a] p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">PokeApi</div>

        <div className="flex space-x-4">
          <a href="/" className="hover:text-gray-300 text-white">
            Inicio
          </a>
          <a href="/myteams" className="hover:text-gray-300 text-white">
            teams
          </a>
          <a href="#" className="hover:text-gray-300 text-white">
            Contacto
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
