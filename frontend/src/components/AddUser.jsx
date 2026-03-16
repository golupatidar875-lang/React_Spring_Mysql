import { useState } from 'react'
import axios from 'axios'

const API_BASE = 'http://localhost:8080/api/users'

function AddUser({ onUserAdded }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!name || !email) {
      setError('Name and Email are required')
      return
    }

    try {
      setLoading(true)
      await axios.post(API_BASE, { name, email })
      setName('')
      setEmail('')
      onUserAdded && onUserAdded()
    } catch (err) {
      console.error(err)
      setError('Failed to add user')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-row">
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Saving…' : 'Add User'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  )
}

export default AddUser
