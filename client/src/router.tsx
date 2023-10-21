import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/Auth/Login/Login'
import Register from './components/Auth/Register/Register'
import Home from './pages/Home'
import Info from './pages/Info'
import { Toaster } from 'react-hot-toast'
import RequireAuth from './components/Auth/RequireAuth/RequireAuth'

type Props = {}

const RouterPage = (props: Props) => {
  return (
    <>

      <Routes>

        <Route path="/" element={<Navigate to={"restaurants"} />} />
        <Route path="/restaurants" element={<Home/>}/>
        <Route path="/info" element={<Info />} />
        
        <Route element={<RequireAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>



      </Routes>

      <Toaster position='bottom-center' />
    </>
  )
}

export default RouterPage