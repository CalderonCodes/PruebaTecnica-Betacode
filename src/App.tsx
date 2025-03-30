import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home.tsx"
import Details from "./pages/details/Details.tsx"
import Teams from "./pages/teams/Teams.tsx"


function App() {


  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/teams" element={<Teams/>} />
        <Route path='/pokemon/:name' element={<Details />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
