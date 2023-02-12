import { useState } from 'react'
import api from './api'

import SearchStatus from './components/searchStatus'
import Users from './components/users'

const App = () => {

  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = id => {
    setUsers(users => users.filter(el => el._id !== id))
  }

 const handleToggleBookmark = id => {
    const currentUsers = users.map(user => user._id === id ? {
      ...user,
      bookmark: !user.bookmark
    } : user)
    setUsers(currentUsers)
 }

  return <>
    <SearchStatus 
      numOfUsers={users.length} 
    />
    <Users 
      users={users} 
      handleDelete={handleDelete}  
      handleToggleBookmark={handleToggleBookmark}
    />
 </>
}

export default App