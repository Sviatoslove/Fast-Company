import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  MultiSelectField,
  RadioField,
  SelectedField,
  TextField
} from '../../common/form'
import { Container } from '../../common/Containers'
import { BackHistoryButton } from '../../common/table'
import { useProfessions, useQualities, useUsers } from '../../../hooks'

const EditUserPage = ({ userId }) => {
  const history = useHistory()
  const [data, setData] = useState({
    name: '',
    email: '',
    sex: '',
    profession: '',
    qualities: ''
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const { professions } = useProfessions()
  const { qualities } = useQualities()
  const { getUserById } = useUsers()
  const { updateUser } = useUsers()

  useEffect(() => {
    setData((prevState) => ({
      ...prevState,
      ...getUserById(userId)
    }))
  }, [])

  useEffect(() => {
    if (data._id && Object.keys(professions).length) {
      setIsLoading(false)
    }
  }, [data, professions])

  useEffect(() => {
    if (error) {
      toast.error(error)
      setError(null)
    }
  }, [error])

  const handleChange = ({ target }) => {
    setData((state) => ({
      ...state,
      [target.name]: target.value
    }))
  }

  const getQualities = (elements) => {
    return elements.reduce((acc, elem) => {
      Object.values(qualities).forEach((qualitie) => {
        if (elem === qualitie._id) {
          acc.push({ label: qualitie.name, value: qualitie._id })
        }
      })
      return acc
    }, [])
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await updateUser({
        ...data,
        qualities: data.qualities.map((q) => q.value)
      })
      history.push('/users/' + userId)
    } catch (error) {
      setError(error)
    }
  }

  return (
    <>
      {!isLoading ? (
        <Container
          classContainer='mt-5 shadow-custom br-10 p-5 w-40vw bc-white'
          classRow=''
        >
          <form onSubmit={handleSubmit}>
            <TextField
              label='Имя'
              value={data.name}
              name='name'
              onChange={handleChange}
            />
            <TextField
              label='Электронная почта'
              value={data.email}
              name='email'
              type='email'
              onChange={handleChange}
            />
            <SelectedField
              label='Выбери свою профессию:'
              options={professions}
              name='profession'
              onChange={handleChange}
              value={data.profession}
            />
            <RadioField
              options={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
                { label: 'Other', value: 'other' }
              ]}
              name='sex'
              value={data.sex}
              onChange={handleChange}
            />
            <MultiSelectField
              label='Выберите свои лучшие качества:'
              name='qualities'
              options={qualities}
              onChange={handleChange}
              defaultValue={getQualities(data.qualities)}
            />
            <button
              type='submit'
              className='btn btn-primary w-100 mx-auto mb-3'
            >
              Обновить
            </button>
            <BackHistoryButton />
          </form>
        </Container>
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
