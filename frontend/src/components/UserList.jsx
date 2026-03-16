import { useEffect, useState } from 'react'
import axios from 'axios'

const API_BASE = 'http://localhost:8080/api/users'

function UserList({ refresh }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadUsers = async () => {
    try {
      setLoading(true)
      setError('')
      const res = await axios.get(API_BASE)
      setUsers(res.data)
    } catch (err) {
      console.error(err)
      setError('Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [refresh])

  return (
    <div className="card">
      <h2>User List</h2>
      {loading && <p>Loading…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && users.length === 0 && !error && <p>No users found.</p>}
      <ul className="user-list">
        {users.map((u) => (
          <li key={u.id}>
            <span className="user-name">{u.name}</span>
            <span className="user-email">{u.email}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserList
