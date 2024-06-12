import React, {useState } from 'react'
import UserContext from './UserContext'
import axios from 'axios'


export default function UserContextProviderCart({children}) {
    let [list, setList] = useState('')
    let [username, setUsername] = useState('')

    let login = async (username, password)=>{
      let result = await axios.post('http://127.0.0.1:3000/api/loginclientData', {username, password})
      console.log(result)
      localStorage.setItem('token', result.data.token)
      return true
    }
  return (
    <UserContext.Provider value={{list, setList, username, setUsername, login}}>
        {children}
    </UserContext.Provider>
  )
}