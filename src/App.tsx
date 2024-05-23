import { Route, Routes } from "react-router-dom";
import Login from './pages/login'
import Register from './pages/register'
import NavigateAppBar from "./NavigateAppBar";

function App() {

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
