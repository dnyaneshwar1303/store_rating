import axios from "axios"
import { useEffect, useState } from "react"

export default function AdminDashboard(){

  const token = localStorage.getItem("token")

  const [stats,setStats] = useState({})
  const [users,setUsers] = useState([])
  const [stores,setStores] = useState([])
  const [owners,setOwners] = useState([])
  const [sortBy,setSortBy] = useState("name")
  const [order,setOrder] = useState("asc")

  const [search,setSearch] = useState("")
  const [roleFilter,setRoleFilter] = useState("")

  const [newUser,setNewUser] = useState({
    name:"", email:"", address:"", password:"", role:"USER"
  })

  const [newStore,setNewStore] = useState({
    name:"", email:"", address:"", owner_id:""
  })

  useEffect(()=>{
    loadDashboard()
    loadUsers()
    loadStores()
    loadOwners()
  },[])

  const loadDashboard = async()=>{
    const res = await axios.get("http://localhost:5000/api/admin/dashboard",{
      headers:{ Authorization:"Bearer "+token }
    })
    setStats(res.data)
  }

  const loadUsers = async()=>{
    const res = await axios.get(
      `http://localhost:5000/api/admin/users?search=${search}&role=${roleFilter}&sortBy=${sortBy}&order=${order}`,
      { headers:{ Authorization:"Bearer "+token } }
    )
    setUsers(res.data)
  }

  const loadStores = async()=>{
    const res = await axios.get(
      `http://localhost:5000/api/admin/stores?search=${search}&sortBy=${sortBy}&order=${order}`,
      { headers:{ Authorization:"Bearer "+token } }
    )
    setStores(res.data)
  }

  const loadOwners = async()=>{
    const res = await axios.get(
      "http://localhost:5000/api/admin/users?role=OWNER",
      { headers:{ Authorization:"Bearer "+token } }
    )
    setOwners(res.data)
  }

  const addUser = async()=>{
    await axios.post("http://localhost:5000/api/admin/user", newUser,{
      headers:{ Authorization:"Bearer "+token }
    })
    alert("User added")
    setNewUser({name:"",email:"",address:"",password:"",role:"USER"})
    loadUsers()
    loadDashboard()
    loadOwners()
  }

  const addStore = async()=>{
    await axios.post("http://localhost:5000/api/admin/store", newStore,{
      headers:{ Authorization:"Bearer "+token }
    })
    alert("Store added")
    setNewStore({name:"",email:"",address:"",owner_id:""})
    loadStores()
    loadDashboard()
  }

  const logout = ()=>{
    localStorage.clear()
    window.location.href="/"
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>

      {/* Stats */}
      <div className="flex gap-6 mb-6">
        <p>Total Users: <b>{stats.users}</b></p>
        <p>Total Stores: <b>{stats.stores}</b></p>
        <p>Total Ratings: <b>{stats.ratings}</b></p>
      </div>

      {/* Add User */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-semibold mb-3">Add User</h3>
        <div className="grid grid-cols-2 gap-3">
          <input className="border p-2" placeholder="Name" value={newUser.name}
            onChange={e=>setNewUser({...newUser,name:e.target.value})}/>
          <input className="border p-2" placeholder="Email" value={newUser.email}
            onChange={e=>setNewUser({...newUser,email:e.target.value})}/>
          <input className="border p-2" placeholder="Address" value={newUser.address}
            onChange={e=>setNewUser({...newUser,address:e.target.value})}/>
          <input className="border p-2" placeholder="Password" value={newUser.password}
            onChange={e=>setNewUser({...newUser,password:e.target.value})}/>
          <select className="border p-2"
            value={newUser.role}
            onChange={e=>setNewUser({...newUser,role:e.target.value})}>
            <option value="USER">Normal User</option>
            <option value="ADMIN">Admin</option>
            <option value="OWNER">Store Owner</option>
          </select>
        </div>
        <button
          onClick={addUser}
          className="mt-3 bg-blue-500 text-white px-4 py-1 rounded"
        >
          Add User
        </button>
      </div>

      {/* Add Store */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-semibold mb-3">Add Store</h3>
        <div className="grid grid-cols-2 gap-3">
          <input className="border p-2" placeholder="Store Name"
            value={newStore.name}
            onChange={e=>setNewStore({...newStore,name:e.target.value})}/>
          <input className="border p-2" placeholder="Store Email"
            value={newStore.email}
            onChange={e=>setNewStore({...newStore,email:e.target.value})}/>
          <input className="border p-2" placeholder="Store Address"
            value={newStore.address}
            onChange={e=>setNewStore({...newStore,address:e.target.value})}/>
          <select className="border p-2"
            value={newStore.owner_id}
            onChange={e=>setNewStore({...newStore,owner_id:e.target.value})}>
            <option value="">Select Owner</option>
            {owners.map(o=>(
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={addStore}
          className="mt-3 bg-green-500 text-white px-4 py-1 rounded"
        >
          Add Store
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-semibold mb-3">Filters</h3>
        <div className="flex gap-3">
          <input className="border p-2 flex-1"
            placeholder="Search"
            onChange={e=>setSearch(e.target.value)} />
          <select className="border p-2"
            onChange={e=>setRoleFilter(e.target.value)}>
            <option value="">All</option>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
            <option value="OWNER">OWNER</option>
          </select>
          <button
            onClick={()=>{loadUsers();loadStores()}}
            className="bg-gray-700 text-white px-4 rounded"
          >
            Apply
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
  <h3 className="text-lg font-semibold text-gray-800 mb-3">Sorting</h3>
  
  <div className="flex flex-wrap gap-3 items-center">
    <select
      className="border p-2 rounded flex-1"
      onChange={e => setSortBy(e.target.value)}
    >
      <option value="name">Name</option>
      <option value="email">Email</option>
      <option value="address">Address</option>
      <option value="role">Role</option>
    </select>

    <select
      className="border p-2 rounded flex-1"
      onChange={e => setOrder(e.target.value)}
    >
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>

    <button
      onClick={() => { loadUsers(); loadStores(); }}
      className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
    >
      Sort
    </button>
  </div>
</div>



      {/* Lists */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-semibold mb-2">Users</h3>
        {users.map(u=>(
          <p key={u.id} className="border-b py-1">
            {u.name} | {u.email} | {u.role}
          </p>
        ))}
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Stores</h3>
        {stores.map(s=>(
          <p key={s.id} className="border-b py-1">
            {s.name} | {s.email} | Rating: {s.rating || 0}
          </p>
        ))}
      </div>

    </div>
  )
}
