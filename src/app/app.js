import { useState } from 'react'
import api from './api'

import SearchStatus from './components/searchStatus'
import Users from './components/users'

const App = () => {

 const [users, setUsers] = useState(api.users.fetchAll())

 const renderPhrase = number => {
   if(number) {
     let z = number % 100 / 10
     let x = number % 10
     z >= 1.1 && z <= 1.4 ? number += ' человек тусанёт':
     x === 2 || x === 3 || x === 4 ? number += ' человека тусанут':
     number += ' человек тусанёт'
     return number + ' с тобой сегодня'
   } else return 'Никто с тобой не тусанёт'
 }

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
    renderPhrase={renderPhrase}
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
   <Users users={users} handleDelete={handleDelete} handleToggleBookmark={handleToggleBookmark}/>
  </table>}
 </>
}

export default App