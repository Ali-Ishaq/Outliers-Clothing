import React, { useContext } from 'react'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import ClientSide from './Client-Side/ClientSide'
import AdminPanel from './Admin-Panel/AdminPanel'
import { userContext } from './Client-Side/Contexts/userContext'


function App() {
  const {userProfile}=useContext(userContext)
  // console.log(role)
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path='/*' element={<ClientSide/>}/>
        <Route path='/admin*' element={<AdminPanel/>}/>
        <Route />
      </Routes>
      
    </BrowserRouter>
  )
}

export default App