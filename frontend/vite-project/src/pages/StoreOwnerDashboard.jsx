import axios from "axios"
import { useEffect, useState } from "react"

export default function StoreOwnerDashboard(){
  const [data,setData] = useState({ratings:[],avg:0})
  const [newPassword, setNewPassword] = useState("")
  const token = localStorage.getItem("token")

  useEffect(()=>{
    axios.get("http://localhost:5000/api/stores/owner",{
      headers:{Authorization:"Bearer "+token}
    }).then(res=>setData(res.data))
  },[])

  const logout = ()=>{
    localStorage.clear()
    window.location.href="/"
  }

  const updatePassword = async () => {
    await axios.put(
      "http://localhost:5000/api/auth/password",
      { password: newPassword },
      { headers:{ Authorization:"Bearer "+token } }
    )
    alert("Password updated")
    setNewPassword("")
  }

  return(
    <div className="p-6 bg-gray-100 min-h-screen">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Store Owner Dashboard</h2>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>

      {/* Update Password */}
      <div className="bg-white p-4 rounded shadow mb-6 max-w-md">
        <h3 className="font-semibold mb-3">Update Password</h3>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={e=>setNewPassword(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />
        <button
          onClick={updatePassword}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Update
        </button>
      </div>

      {/* Ratings */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-3">
          Average Rating: <span className="font-bold">{data.avg || 0}</span>
        </h3>

        <h4 className="font-medium mb-2">Users who rated your store</h4>

        {data.ratings.length === 0 && (
          <p className="text-gray-500">No ratings yet</p>
        )}

        {data.ratings.map((r,i)=>(
          <p key={i} className="border-b py-1">
            {r.name} ({r.email}) → <b>{r.rating}</b>
          </p>
        ))}
      </div>

    </div>
  )
}
