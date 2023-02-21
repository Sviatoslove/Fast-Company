import React, { useState, useEffect } from 'react'
import api from './api'
import Users from './components/users'

const App = () => {
  const [users, setUsers] = useState()

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
  }, [])

  const handleDelete = (id) => {
    setUsers((users) => users.filter((el) => el._id !== id))
  }

  const handleToggleBookmark = (id) => {
    const currentUsers = users.map((user) =>
      user._id === id
        ? {
            ...user,
            bookmark: !user.bookmark
          }
        : user
    )
    setUsers(currentUsers)
  }

  return (
    <>
      {users && (
        <Users
          users={users}
          onDelete={handleDelete}
          onToggleBookmark={handleToggleBookmark}
        />
      )}
    </>
  )
}

export default App
