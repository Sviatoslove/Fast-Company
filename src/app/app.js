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
  {users.length > 0 && <table className="table text-center">
    <thead>
      <tr>
        <th scope="col">Имя</th>
        <th scope="col">Качества</th>
        <th scope="col">Профессия</th>
        <th scope="col">Встретился, раз</th>
        <th scope="col">Оценка</th>
        <th scope="col">Избранное</th> 
        <th></th>
      </tr>
    </thead>
    <tbody>
      <Users users={users} handleDelete={handleDelete} handleToggleBookmark={handleToggleBookmark}/>
    </tbody>
  </table>}
 </>
}

export default App