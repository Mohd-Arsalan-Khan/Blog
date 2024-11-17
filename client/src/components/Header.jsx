import { Avatar, Button, Dropdown, DropdownHeader, Navbar, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {AiOutlineSearch} from "react-icons/ai"
import {FaMoon, FaSun} from "react-icons/fa"
import {useSelector, useDispatch} from "react-redux"
import { toggleTheme } from '../redux/theme/themeSlice'
import { signoutUserSuccess } from '../redux/user/userSlice'

function Header() {
    const path = useLocation().pathname;
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {currentUser} = useSelector(state => state.user)
    const {theme} = useSelector(state => state.theme)
    const [searchTerm, setSearchTerm] = useState('')
    
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const searchTermFromUrl = urlParams.get('searchTerm')
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl)
        }
    },[location.search])

    const handleSignout = async() =>{
        try {
            const res = await fetch('/api/v1/user/signout',{
                method: 'POST'
            })
            const data = await res.json()
            if (!res.ok) {
                console.log(data.message)
            }else{
                dispatch(signoutUserSuccess(data))
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        const urlParams = new URLSearchParams(location.search)
        urlParams.set('searchTerm', searchTerm)
        const serachQuery = urlParams.toString()
        navigate(`/search?${serachQuery}`) 
    }

  return (
    <Navbar className='border-b-2'>
        <Link to = "/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg'>Echo</span>
        Blog
        </Link>
        <form onSubmit={handleSubmit}>
            <TextInput
                type='text'
                placeholder='search..'
                rightIcon={AiOutlineSearch}
                className='hidden lg:inline'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </form>
        <Button className='w-12 h-10 lg:hidden' color="gray" pill onClick={() => navigate('/search')}>
            <AiOutlineSearch/>
        </Button>
        <div className='flex gap-2 md:order-2'>
            <Button className='w-12 h-10 inline' color="gray" pill onClick={()=>dispatch(toggleTheme())}>
                {theme === 'light' ? <FaSun/> : <FaMoon/>}
            </Button>
            {currentUser ? (
                <Dropdown arrowIcon={false} inline label={
                    <Avatar
                    alt="user"
                    img={currentUser.profilePicture}
                    rounded
                    />
                }>
                    <Dropdown.Header>
                        <span className='block text-sm'>@{currentUser.username}</span>
                        <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                    </Dropdown.Header>
                    <Link to={"/Dashboard?tab=profile"}>
                        <Dropdown.Item>Profile</Dropdown.Item>
                    </Link>
                    <Dropdown.Divider/>
                    <Link to={"/Sign-In"}>
                    <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
                    </Link>
                </Dropdown>
            ) : 
            ( <Link to="/Sign-In">
                <Button gradientDuoTone="purpleToBlue" outline>
                    Sign In
                </Button>
            </Link>)}
           
            <Navbar.Toggle/>
        </div>
        <Navbar.Collapse>
            <Navbar.Link active={path === "/"} as="div" onClick={() => navigate('/')}>
                <Link to="/">Home</Link>
            </Navbar.Link>
            
            <Navbar.Link active={path === "/About"} as="div" onClick={() => navigate('/About')}>
                <Link to="/About">
                About
                </Link>
            </Navbar.Link>
            <Navbar.Link active={path === "/Learn"} as="div" onClick={() => navigate('/Learn')}>
                <Link to="/Learn">
                Learn More
                </Link>
            </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
    )
}

export default Header