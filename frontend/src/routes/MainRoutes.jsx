import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Create from '../pages/Create'
import History from '../components/History'

const MainRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home/>} />
             <Route path="/login" element={<Login/>} />
             <Route path="/register" element={<Signup/>} />
             <Route path="/create" element={<Create/>} />
              <Route path="/history" element={<History/>} />
        </Routes>
    </div>
  )
}

export default MainRoutes