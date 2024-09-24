import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import About from "./pages/About"
import Signin from "./pages/Signin"
import SignOut from "./pages/SignOut"
import Home from "./pages/Home"
import Project from "./pages/Project"
import Header from "./components/Header"

function App() {
  return (
    <>
      <BrowserRouter>
      <Header/>
      <Routes>
      <Route path= "/" element= {<Home/>} />
      <Route path= "/About" element= {<About/>} />
      <Route path= "/Dashboard" element= {<Dashboard/>} />
      <Route path= "/Project" element= {<Project />} />
      <Route path= "/Sign-In" element= {<Signin/>} />
      <Route path= "/Sign-Out" element= {<SignOut/>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
