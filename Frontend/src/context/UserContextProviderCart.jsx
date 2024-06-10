import React, {useState } from 'react'
import UserContext from './UserContext'

export default function UserContextProviderCart({children}) {
    let [list, setList] = useState('')
    let [username, setUsername] = useState('')
  return (
    <UserContext.Provider value={{list, setList, username, setUsername}}>
        {children}
    </UserContext.Provider>
  )
}