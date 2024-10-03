import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import About from "./pages/About"
import Signin from "./pages/SignIn"
import Home from "./pages/Home"
import Project from "./pages/Project"
import Header from "./components/Header"
import SignUp from "./pages/SignUp"
import Footer from "./components/Footer"

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
      <Route path= "/Sign-Up" element= {<SignUp/>} />
      </Routes>
      <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
