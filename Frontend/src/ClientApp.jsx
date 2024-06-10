import React from 'react'
import ClientNavbar from './components/client/ClientNavbar'
import { Outlet } from 'react-router-dom'
import UserContextProviderCart from './context/UserContextProviderCart'

export default function ClientApp() {
  return (
    <div>
      <UserContextProviderCart>
        {/* <ClientNavbar/> */}
        <Outlet/>
      </UserContextProviderCart>
    </div>
  )
}
