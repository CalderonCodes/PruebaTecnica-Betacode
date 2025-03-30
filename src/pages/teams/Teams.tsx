import TeamCard from "../../components/Cards/TeamCard"
import Navbar from "../../components/Navigation/Navbar"

function Teams() {
  return (
    <div className=" h-screen min-h-screen flex flex-col gap-5 items-center text-white ">
    <Navbar />
    <h1 className="font-bold text-3xl">
        My Teams
    </h1>
    <div className="w-full grid lg:grid-cols-2 grid-cols-1 items-center px-2 gap-5">
        <TeamCard/>
        <TeamCard/>        
        <TeamCard/>
        <TeamCard/>
    </div>
  </div>
  )
}

export default Teams