import React from 'react'
import MainRoutes from './routes/MainRoutes'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div className='bg-black text-white min-h-screen w-full'>
      <Navbar/>
      <MainRoutes/>
    </div>
  )
}

export default App