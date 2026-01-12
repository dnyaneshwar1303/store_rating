import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Register(){
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [address,setAddress] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")
  const navigate = useNavigate()

  const register = async()=>{
    if(name.length < 20 || name.length > 60)
      return setError("Name must be 20–60 characters")

    if(address.length > 400)
      return setError("Address max 400 characters")

    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return setError("Invalid email")

    if(!/^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,16}$/.test(password))
      return setError("Password must have 1 uppercase, 1 special char, 8–16 chars")

    try{
      await axios.post("http://localhost:5000/api/auth/register",
        {name,email,address,password}
      )
      alert("Registered successfully")
      navigate("/")
    }
    catch(err){
      setError(err.response.data.message)
    }
  }

  return(
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">Signup</h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <input
          placeholder="Name"
          className="w-full border p-2 mb-3 rounded"
          onChange={e=>setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded"
          onChange={e=>setEmail(e.target.value)}
        />

        <input
          placeholder="Address"
          className="w-full border p-2 mb-3 rounded"
          onChange={e=>setAddress(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4 rounded"
          onChange={e=>setPassword(e.target.value)}
        />

        <button
          onClick={register}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Register
        </button>
      </div>
    </div>
  )
}
