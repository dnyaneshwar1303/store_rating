import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password })

      localStorage.setItem("token", res.data.token)
      localStorage.setItem("role", res.data.role)

      if (res.data.role === "ADMIN") navigate("/admin")
      else if (res.data.role === "OWNER") navigate("/owner")
      else navigate("/user")
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
    }
  }

  return (
    <div className="w-80 mx-auto mt-24 p-6 bg-white shadow-md rounded-md text-center">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
        className="w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={login}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Login
      </button>

      <p className="mt-4 text-sm">
        Don’t have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer hover:underline"
          onClick={() => navigate("/register")}
        >
          Sign Up
        </span>
      </p>
    </div>
  )
}
