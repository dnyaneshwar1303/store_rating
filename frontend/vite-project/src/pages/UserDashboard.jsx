import axios from "axios"
import { useEffect, useState } from "react"

export default function UserDashboard(){

  const token = localStorage.getItem("token")

  const [stores, setStores] = useState([])
  const [search, setSearch] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [sortBy,setSortBy] = useState("name")
  const [order,setOrder] = useState("asc")


  const logout = () => {
    localStorage.clear()
    window.location.href = "/"
  }

  const loadStores = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/stores?search=${search}&sortBy=${sortBy}&order=${order}`,
      { headers:{ Authorization:"Bearer "+token } }
    )
    setStores(res.data)
  }

  useEffect(()=>{
    loadStores()
  },[])

  const rateStore = async (storeId, rating) => {
    await axios.post(
      "http://localhost:5000/api/ratings",
      { store_id: storeId, rating },
      { headers:{ Authorization:"Bearer "+token } }
    )
    alert("Rating saved")
    loadStores()
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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">User Dashboard</h2>
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

      {/* Search */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-semibold mb-3">Search Stores</h3>
        <div className="flex gap-3">
          <input
            placeholder="Search by name or address"
            value={search}
            onChange={e=>setSearch(e.target.value)}
            className="border p-2 flex-1 rounded"
          />
          <button
            onClick={loadStores}
            className="bg-gray-700 text-white px-4 rounded"
          >
            Search
          </button>
        </div>
      </div>

       <div className="bg-white p-4 rounded shadow mb-6">
  <h3 className="text-lg font-semibold text-gray-800 mb-3">Sort Stores</h3>
  
  <div className="flex flex-wrap gap-3 items-center">
    <select
      className="border p-2 rounded flex-1"
      onChange={e => setSortBy(e.target.value)}
    >
      <option value="name">Name</option>
      <option value="address">Address</option>
    </select>

    <select
      className="border p-2 rounded flex-1"
      onChange={e => setOrder(e.target.value)}
    >
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>

    <button
      onClick={loadStores}
      className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
    >
      Sort
    </button>
  </div>
</div>

       
      {/* Stores */}
      <div className="grid gap-4">
        {stores.map(store=>(
          <div
            key={store.id}
            className="bg-white p-4 rounded shadow"
          >
            <h4 className="text-lg font-semibold">{store.name}</h4>

            <p className="text-sm text-gray-600 mb-1">
              <b>Address:</b> {store.address}
            </p>

            <p className="mb-1">
              <b>Overall Rating:</b>{" "}
              {store.overallRating
                ? Number(store.overallRating).toFixed(1)
                : "No ratings"}
            </p>

            <p className="mb-2">
              <b>Your Rating:</b>{" "}
              {store.userRating || "Not rated yet"}
            </p>

            <input
              type="number"
              min="1"
              max="5"
              defaultValue={store.userRating || ""}
              onBlur={(e)=>rateStore(store.id, e.target.value)}
              placeholder="Rate 1 to 5"
              className="border p-2 rounded w-32"
            />
          </div>
        ))}
      </div>

    </div>
  )
}
