import { useState } from 'react'
import api from '../api'

const Users = () => {

 const [users, setUsers] = useState(api.users.fetchAll())

 const handleDelete = userId => {
  setUsers(users => users.filter(el => el._id !== userId))
 }

 const renderPhrase = number => {
  if(number) {
    let z = number % 100 / 10;
    let x = number % 10;
    z >= 1.1 && z <= 1.4 ? number += ' человек':
    x === 2 || x === 3 || x === 4 ? number += ' человека':
    number += ' человек';
   return number + ' тусанёт с тобой сегодня'
  } else return 'Никто с тобой не тусанёт'
 }

 return (
 <>
  <h4 className={'fs-4 badge m-2 ' + (users.length ? 'bg-primary' : 'bg-danger')}>{renderPhrase(14)}</h4>
  {users.length ? <table className="table">
   <thead>
    <tr>
     <th scope="col">Имя</th>
     <th scope="col">Качества</th>
     <th scope="col">Профессия</th>
     <th scope="col">Встретился, раз</th>
     <th scope="col">Оценка</th>
     <th></th>
    </tr>
   </thead>
   <tbody>
    {users.map(row => 
     <tr key={row._id}>
      <td key={row.name}>{row.name}</td>
      <td>
       {row.qualities.map(elem => 
       <span className={'badge bg-' + elem.color + ' m-1'} key={elem._id}>
        {elem.name}
       </span>)}
      </td>
      <td key={Object.values(row.profession)[0]}>{Object.values(row.profession)[1]}</td>
      <td key={row.completedMeetings}>{row.completedMeetings}</td>
      <td key={row.rate}>{row.rate}/5</td>
      <td>
       <button className="btn btn-danger" onClick={() => handleDelete(row._id)}>delete</button>
      </td>
     </tr>
     )}
   </tbody>
  </table> : null}
  </>
 )
}

export default Users