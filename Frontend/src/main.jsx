import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Table from './components/Table.jsx'
import Form from './components/Form.jsx'
import View from './components/View.jsx'
import UpdateProduct from './components/UpdateProduct.jsx'
import ClientApp from './ClientApp.jsx'
import Sidebar from './components/client/Sidebar.jsx'
import Protected from './components/Protected.jsx'
import AdminLogin from './components/AdminLogin.jsx'
import Cart from './components/client/Cart.jsx'
import SignIn from './components/client/Signin.jsx'

import CleintSignup from './components/client/CleintSignup.jsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<ClientApp/>}>
      <Route path='' element= {<Sidebar/>}/>
      <Route path='/cart' element= {<Cart/>}/>
      <Route path='/signin' element= {<SignIn/>}/>
      <Route path='/clientsignup' element= {<CleintSignup/>}/>
    </Route>




    <Route path='/admin' element = {<App/>}>
      <Route path='' element = {
        <Protected>
          <Table/>
        </Protected>
      }/>
      <Route path='/admin/form' element = {
        <Protected>
          <Form/>
        </Protected>
      }/>
      <Route path='/admin/adminLogin' element = {<AdminLogin/>}/>
      <Route path='/admin/view/:id' element = {<View/>}/>
      <Route path='/admin/update/:id' element={<UpdateProduct/>}/>
    </Route>
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
