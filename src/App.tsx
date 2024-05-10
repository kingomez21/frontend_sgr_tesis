import { Route, Routes, useNavigate } from "react-router-dom";
import Login from './pages/login'
import Register from './pages/register'
import NavigateAppBar from "./NavigateAppBar";
import { useEffect} from 'react'
import {useContextUserAuth} from './store'

function App() {

  const token = useContextUserAuth((state) => state.token)
  const payload = useContextUserAuth((state) => state.payload)
  const data = useContextUserAuth((state) => state.data)
  console.log(token)
  console.log(payload)
  console.log(data)
  const navigate = useNavigate()

  useEffect(() => {
    if (token === undefined || token === "") navigate("/login")
  }, [token, payload, data])

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
