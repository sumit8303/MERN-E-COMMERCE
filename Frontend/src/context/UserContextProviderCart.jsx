import React, {useEffect, useState } from 'react'
import UserContext from './UserContext'
import axios from 'axios'


export default function UserContextProviderCart({children}) {
    let [list, setList] = useState('')
    let [auth, setAuth] = useState({
      token: localStorage.getItem('token')|| null,
      isAuthorized : !!localStorage.getItem('token'),
      username: ''
    })

    let login = async (username, password)=>{
      let result = await axios.post('http://localhost:3000/api/loginclientData', {username, password})
      localStorage.setItem('token', result.data.token)
      setAuth({token:result.data.token, isAuthorized:true, username:username})
       if(result.data.isMatch == true){
        return true
       }
      }
    let logOut = ()=>{
      localStorage.removeItem('token')
      setAuth({token: null, isAuthorized:false, username: ''})
    }

    async function profile(){
      let token = localStorage.getItem('token')
      try{
        if(token){
          let result = await axios.get('http://localhost:3000/api/profile')
          setAuth({token:token, isAuthorized:true , username: result.data.username})
        }
      } catch(error){
        logOut()
      }
    }

    useEffect(()=>{
      let token = localStorage.getItem('token')
      if(token){
        axios.defaults.headers.common['Authorization']= `Bearer ${token}`
        profile()
      }
    }, [])

  return (
    <UserContext.Provider value={{list,setList, login, logOut, auth}}>
        {children}
    </UserContext.Provider>
  )
}