import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import AdminDashboard from "./pages/AdminDashboard"
import UserDashboard from "./pages/UserDashboard"
import StoreOwnerDashboard from "./pages/StoreOwnerDashboard"
import "./App.css";

function App() {
  const role = localStorage.getItem("role")
  

  return (
    <>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/register" element={<Register/>} />

      <Route path="/admin" element={role==="ADMIN"?<AdminDashboard/>:<Navigate to="/" />} />
      <Route path="/user" element={role==="USER"?<UserDashboard/>:<Navigate to="/" />} />
      <Route path="/owner" element={role==="OWNER"?<StoreOwnerDashboard/>:<Navigate to={"/"}/>}/>
    </Routes>
    </>
  )
}

export default App
