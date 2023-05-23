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
import { formatDataForFields } from '../../../utils'
import { Container } from '../../../../layoutStyles'
import { BackHistoryButton } from '../../common/table'

const EditUserPage = ({ userId }) => {
  const [data, setData] = useState({
    name: '',
    email: '',
    sex: '',
    profession: '',
    qualities: ''
  })

  const [professions, setProfessions] = useState([])
  const [qualities, setQualities] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const history = useHistory()

  useEffect(() => {
    API.users.getById(userId).then(({ profession, qualities, ...data }) =>
      setData((prevState) => ({
        ...prevState,
        ...data,
        qualities: formatDataForFields(qualities),
        profession: profession._id
      }))
    )
    API.professions.fetchAll().then((data) => setProfessions(data))
    API.qualities
      .fetchAll()
      .then((data) => setQualities(data))
      .then(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    if (data._id && Object.keys(professions).length) setIsLoading(false)
  }, [data, professions])

  const handleChange = ({ target }) => {
    setData((state) => ({
      ...state,
      [target.name]: target.value
    }))
  }

  const getQualities = (elements) => {
    return elements.reduce((acc, elem) => {
      Object.values(qualities).forEach((qualitie) => {
        if (elem.value === qualitie._id) acc.push(qualitie)
      })
      return acc
    }, [])
  }

  const getProfession = (id) => {
    return Object.values(professions).find(
      (profession) => profession._id === id
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    API.users
      .update(userId, {
        ...data,
        profession: getProfession(data.profession),
        qualities: getQualities(data.qualities)
      })
      .then(() => history.push('/users/' + userId))
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
              defaultValue={data.qualities}
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
