import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import About from "./pages/About"
import Signin from "./pages/SignIn"
import Home from "./pages/Home"
import Project from "./pages/Project"
import Header from "./components/Header"
import SignUp from "./pages/SignUp"
import Footer from "./components/Footer"
import PrivateRoute from "./components/PrivateRoute"
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute"
import Createpost from "./pages/Createpost"

function App() {
  return (
    <>
      <BrowserRouter>
      <Header/>
      <Routes>
      <Route path= "/" element= {<Home/>} />
      <Route path= "/About" element= {<About/>} />
      <Route element={<PrivateRoute/>}>
      <Route path= "/Dashboard" element= {<Dashboard/>} />
      </Route>
      <Route element={<OnlyAdminPrivateRoute/>}>
      <Route path= "/create-post" element= {<Createpost/>} />
      </Route>
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
