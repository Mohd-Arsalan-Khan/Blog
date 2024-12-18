import React from 'react'
import {useState, useEffect} from 'react'
import {useLocation} from "react-router-dom"
import DashSidebar from "../components/DashSidebar"
import DashProfile from "../components/DashProfile"
import DashPosts from '../components/DashPosts'
import DashUsers from '../components/DashUsers'
import DashComment from '../components/DashComment'
import DashboardComponent from '../components/DashboardComponent'

function Dashboard() {
  const location = useLocation()
  const [tab, setTab] = useState("")
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get("tab")
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])
  

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* sidebar */}
        <DashSidebar/>
      </div>
      {/* Profile */}
      {tab === "profile" && <DashProfile/>}
      {/* posts */}
      {tab === "posts" && <DashPosts/>}
      {/* users */}
      {tab === "users" && <DashUsers/>}
      {/* comment */}
      {tab === "comments" && <DashComment/>}
      {/* Dashboard */}
      {tab === "dash" && <DashboardComponent/> }
    </div>
  )
}

export default Dashboard