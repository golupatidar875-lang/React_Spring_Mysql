import { useState } from 'react'
import './App.css'
import UserList from './components/UserList'
import AddUser from './components/AddUser'

function App() {
  const [refresh, setRefresh] = useState(false)

  const handleUserAdded = () => {
    setRefresh((prev) => !prev)
  }

  return (
    <div className="app-container">
      <h1>User Management</h1>
      <AddUser onUserAdded={handleUserAdded} />
      <hr />
      <UserList refresh={refresh} />
    </div>
  )
}

export default App
