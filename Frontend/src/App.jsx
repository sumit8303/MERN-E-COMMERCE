import React from 'react'
import Navbar from './components/Navbar'
import {Outlet} from 'react-router-dom'
import UserContextProvider from './context/UserContextProvider'

export default function App() {
  return (
    <div>
      <UserContextProvider>
      <Navbar/> 
      <Outlet/> 
      </UserContextProvider>
    </div>
  )
}
