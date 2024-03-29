import React, { useEffect, useState } from 'react'
import { validator, validatorConfig } from '../../utils'
import {
  CheckboxField,
  MultiSelectField,
  RadioField,
  SelectedField,
  TextField
} from '../common/form'
import { useDispatch, useSelector } from 'react-redux'
import { selectQualities } from '../../store/qualities'
import { selectGetProfessions } from '../../store/professions'
import { selectAuthError, signUp } from '../../store/users'

const RegisterForm = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState({
    email: '',
    name: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    license: false
  })
  const professions = useSelector(selectGetProfessions())
  const qualities = useSelector(selectQualities())
  const [errors, setErrors] = useState(null)
  const errorRegister = useSelector(selectAuthError())

  useEffect(() => {
    setErrors(errorRegister)
  }, [errorRegister])

  const handleChange = ({ target }) => {
    setData((state) => ({ ...state, [target.name]: target.value }))
    setErrors(null)
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

    const newData = { ...data, qualities: data.qualities.map((q) => q.value) }
    dispatch(signUp(newData))
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
        label='Имя'
        value={data.name}
        name='name'
        onChange={handleChange}
        error={errors.name}
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
      {errorRegister && <p className='text-danger'>{errorRegister}</p>}
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
