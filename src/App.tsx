import { Route, Routes, useNavigate } from "react-router-dom";
import Login from './pages/login'
import Register from './pages/register'
import NavigateAppBar from "./NavigateAppBar";
import { useEffect, useState } from 'react'

function App() {

  const [token, ] = useState(localStorage.getItem('token'))

  const navigate = useNavigate()

  useEffect(() => {
    if (token === undefined || token === null) navigate("/login")
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<NavigateAppBar />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App
