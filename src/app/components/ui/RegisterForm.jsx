import React, { useEffect, useState } from 'react'
import { validator, validatorConfig } from '../utils'
import API from '../../api'
import { CheckboxField, MultiSelectField, RadioField, SelectedField, TextField } from '../common/form'

const RegisterForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    license: false
  })
  const [errors, setErrors] = useState({})
  const [professions, setProfessions] = useState([])
  const [qualities, setQualities] = useState({})

  useEffect(() => {
    API.professions.fetchAll().then((data) => setProfessions(data))
    API.qualities.fetchAll().then((data) => setQualities(data))
  }, [])

  const handleChange = ({ target }) => {
    setData((state) => ({ ...state, [target.name]: target.value }))
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return !!Object.keys(errors).length
  }

  useEffect(() => {
    validate()
  }, [data])

  const isValid = !!Object.keys(errors).length

  const handleSubmit = (event) => {
    event.preventDefault()
    const isVal = validate()
    if (isVal) return
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label='Электронная почта'
        value={data.email}
        name='email'
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label='Пароль'
        value={data.password}
        name='password'
        type='password'
        onChange={handleChange}
        error={errors.password}
      />
      <SelectedField
        label='Выбери свою профессию:'
        options={professions}
        name='profession'
        onChange={handleChange}
        value={data.profession}
        error={errors.profession}
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
        error={errors.qualities}
      />
      <CheckboxField
        name='license'
        value={data.license}
        onChange={handleChange}
        error={errors.license}
      >
        Согласен с <a href=''>лицензионным соглашением</a>
      </CheckboxField>
      <button
        type='submit'
        disabled={isValid}
        className='btn btn-primary w-100 mx-auto'
      >
        Войти
      </button>
    </form>
  )
}

export default RegisterForm
