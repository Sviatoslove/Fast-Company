import React, { useEffect, useState } from 'react'
import API from '../../../api'
import PropTypes from 'prop-types'
import {
  MultiSelectField,
  RadioField,
  SelectedField,
  TextField
} from '../../common/form'
import { useHistory } from 'react-router-dom'

const EditUserPage = ({ userId }) => {
  const [user, setUser] = useState()
  const [professions, setProfessions] = useState([])
  const [qualities, setQualities] = useState({})
  const history = useHistory()

  useEffect(() => {
    API.users.getById(userId).then((user) => setUser(user))
    API.professions.fetchAll().then((data) => setProfessions(data))
    API.qualities.fetchAll().then((data) => setQualities(data))
  }, [])

  const rollbackData = (data, typeField) => {
    let res = data
    if (typeField === 'profession') {
      res = Object.values(professions).find((item) => item._id === data)
    } else if (typeField === 'qualities') {
      res = data.reduce(
        (acc, item) =>
          (acc = [
            ...acc,
            { name: item.label, _id: item.value, color: item.color }
          ]),
        []
      )
    }
    return res
  }

  const handleChange = ({ target }) => {
    setUser((state) => ({
      ...state,
      [target.name]: rollbackData(target.value, target.name)
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    API.users.update(userId, user)
    history.push('/users/' + userId)
  }

  return (
    <>
      {user ? (
        <div className='container mt-5'>
          <div className='row'>
            <div className='col-md-6 offset-md-3 shadow p-4'>
              <form onSubmit={handleSubmit}>
                <TextField
                  label='Имя'
                  value={user.name}
                  name='name'
                  onChange={handleChange}
                />
                <TextField
                  label='Электронная почта'
                  value={user.email}
                  name='email'
                  type='email'
                  onChange={handleChange}
                />
                <SelectedField
                  label='Выбери свою профессию:'
                  options={professions}
                  name='profession'
                  onChange={handleChange}
                  value={user.profession._id}
                />
                <RadioField
                  options={[
                    { label: 'Male', value: 'male' },
                    { label: 'Female', value: 'female' },
                    { label: 'Other', value: 'other' }
                  ]}
                  name='sex'
                  value={user.sex}
                  onChange={handleChange}
                />
                <MultiSelectField
                  label='Выберите свои лучшие качества:'
                  name='qualities'
                  options={qualities}
                  onChange={handleChange}
                  defaultValue={user.qualities}
                />
                <button type='submit' className='btn btn-primary w-100 mx-auto'>
                  Обновить
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        'loading...'
      )}
    </>
  )
}

EditUserPage.propTypes = {
  userId: PropTypes.string.isRequired
}

export default EditUserPage
