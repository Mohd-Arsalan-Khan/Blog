import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import About from "./pages/About"
import Signin from "./pages/SignIn"
import Home from "./pages/Home"
import Learn from "./pages/Learn"
import Header from "./components/Header"
import SignUp from "./pages/SignUp"
import Footer from "./components/Footer"
import PrivateRoute from "./components/PrivateRoute"
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute"
import Createpost from "./pages/Createpost"
import UpdatePost from "./pages/UpdatePost"
import PostPage from "./pages/PostPage"
import ScrollToTop from "./components/ScrollToTop"
import Search from "./pages/Search"

function App() {
  return (
    <>
      <BrowserRouter>
      <ScrollToTop/>
      <Header/>
      <Routes>
      <Route path= "/" element= {<Home/>} />
      <Route path= "/About" element= {<About/>} />
      <Route element={<PrivateRoute/>}>
      <Route path= "/Dashboard" element= {<Dashboard/>} />
      </Route>
      <Route element={<OnlyAdminPrivateRoute/>}>
      <Route path= "/create-post" element= {<Createpost/>} />
      <Route path= "/update-post/:postId" element= {<UpdatePost/>} />
      </Route>
      <Route path= "/Learn" element= {<Learn />} />
      <Route path= "/Sign-In" element= {<Signin/>} />
      <Route path= "/Sign-Up" element= {<SignUp/>} />
      <Route path="/search" element={<Search/>}/>
      <Route path= "/post/:postSlug" element= {<PostPage/>} />
      </Routes>
      <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
