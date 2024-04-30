import {BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './pages/login'
import Register from './pages/register'
import NavigateAppBar from "./NavigateAppBar";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NavigateAppBar />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
