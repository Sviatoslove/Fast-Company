import React, { useState, useEffect } from 'react'
import api from '../../../api'
import QualitiesList from '../../ui/qualities/QualitiesList'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

const UserPage = ({ userId }) => {
  const [user, setUser] = useState()
  const history = useHistory()
  const { location } = useHistory()

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data))
  }, [])

  const handleToUsers = ({ target }) => {
    if (target.textContent === 'Назад') {
      history.push('/users')
    } else if (target.textContent === 'Редактировать') {
      history.push(location.pathname + '/edit')
    }
  }

  return (
    <>
      {user ? (
        <div className='card shadow mt-5 mx-auto w-content'>
          <div className='card-body'>
            <h1 className='card-title'>{user.name}</h1>
            <h2 className='card-subtitle mb-2 text-body-secondary'>
              Профессия: {user.profession.name}
            </h2>
            <QualitiesList qualities={user.qualities} />
            <h4>Встретился, раз: {user.completedMeetings}</h4>
            <h2>Рейтинг: {user.rate}</h2>
            <div className='d-flex justify-content-between'>
              <button
                className='btn btn-secondary mx-auto c-jack ff-roboto fw-400'
                onClick={handleToUsers}
              >
                Назад
              </button>
              <button
                className='btn btn-info mx-auto c-jack ff-roboto fw-400'
                onClick={handleToUsers}
              >
                Редактировать
              </button>
            </div>
          </div>
        </div>
      ) : (
        'loading...'
      )}
    </>
  )
}

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
}

export default UserPage
