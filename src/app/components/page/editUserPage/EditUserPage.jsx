import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  MultiSelectField,
  RadioField,
  SelectedField,
  TextField
} from '../../common/form'
import { Container } from '../../common/Containers'
import { BackHistoryButton } from '../../common/table'
import { validator, validatorConfig } from '../../../utils'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectQualities,
  selectQualitiesLoadingStatus
} from '../../../store/qualities'
import {
  selectGetProfessions,
  selectGetProfessionsLoadingStatus
} from '../../../store/professions'
import { selectCurrentUser, userUpdated } from '../../../store/users'

const EditUserPage = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState({})

  const professions = useSelector(selectGetProfessions())
  const professionsIsLoadingStatus = useSelector(
    selectGetProfessionsLoadingStatus()
  )
  const qualities = useSelector(selectQualities())
  const qualitiesIsLoadingStatus = useSelector(
    selectQualitiesLoadingStatus()
  )

  const currentUser = useSelector(selectCurrentUser())

  useEffect(() => {
    if (!qualitiesIsLoadingStatus && !professionsIsLoadingStatus) {
      setData(currentUser)
    }
  }, [qualities, professions])

  useEffect(() => {
    if (data._id) {
      setIsLoading(false)
    }
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setError(errors)
    return !!Object.keys(errors).length
  }

  useEffect(() => {
    validate()
  }, [data])

  const handleChange = ({ target }) => {
    setData((state) => ({
      ...state,
      [target.name]: target.value
    }))
  }

  const transformQualities = (elements) => {
    return elements.reduce((acc, elem) => {
      Object.values(qualities).forEach((qualitie) => {
        if (elem === qualitie._id) {
          acc.push({ label: qualitie.name, value: qualitie._id })
        }
      })
      return acc
    }, [])
  }

  const isValid = !!Object.keys(error).length

  const handleSubmit = (event) => {
    event.preventDefault()
    const isVal = validate()
    if (isVal) return
    const user = {
      ...data,
      qualities: data.qualities.map((q) => (q.value ? q.value : q))
    }
    dispatch(userUpdated(user))
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
              error={error.name}
            />
            <TextField
              label='Электронная почта'
              value={data.email}
              name='email'
              type='email'
              onChange={handleChange}
              error={error.email}
            />
            <SelectedField
              label='Выбери свою профессию:'
              options={professions}
              name='profession'
              onChange={handleChange}
              value={data.profession}
              error={error.professions}
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
              defaultValue={transformQualities(data.qualities)}
              error={error.qualities}
            />
            <button
              type='submit'
              className='btn btn-primary w-100 mx-auto mb-3'
              disabled={isValid}
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
  userId: PropTypes.string
}

export default EditUserPage
