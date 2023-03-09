import React, { useState, useEffect } from 'react'
import api from '../api'
import QualitiesList from './qualitiesList'
import { useHistory } from 'react-router-dom'

const User = ({ id }) => {
  const [user, setUser] = useState()
  const history = useHistory()

  useEffect(() => {
    api.users.getById(id).then((data) => setUser(data))
  }, [])

  const handleToUsers = () => {
    history.push('/users')
  }

  return (
    <>
      {user ? (
        <div className='m-3'>
          <h1>{user.name}</h1>
          <h2>Профессия: {user.profession.name}</h2>
          <QualitiesList qualities={user.qualities} />
          <h4>Встретился, раз: {user.completedMeetings}</h4>
          <h2>Рейтинг: {user.rate}</h2>
          <button onClick={handleToUsers}>Все пользователи</button>
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  )
}

export default User
