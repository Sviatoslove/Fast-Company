import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { validator, validatorConfig } from '../../utils'
import { TextField, CheckboxField } from '../common/form'
import { useAuth } from '../../hooks'

const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '', stayOn: false })
  const [errors, setErrors] = useState({})
  const history = useHistory()
  const { logIn } = useAuth()

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

  const handleSubmit = async (event) => {
    event.preventDefault()
    const isVal = validate()
    if (isVal) return

    try {
      await logIn(data)
      history.push('/')
    } catch (error) {
      setErrors(error)
    }
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
      <CheckboxField
        name='stayOn'
        value={data.stayOn}
        onChange={handleChange}
        error={errors.stayOn}
      >
        Оставаться в системе
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

export default LoginForm
