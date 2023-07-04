import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { history, validator } from '../../utils'
import { TextField, CheckboxField } from '../common/form'
import { logIn, selectAuthError } from '../../store/users'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState({ email: '', password: '', stayOn: false })
  const [errors, setErrors] = useState({})
  const loginError = useSelector(selectAuthError())
  const [enterError, setEnterError] = useState(null)

  const handleChange = ({ target }) => {
    setData((state) => ({ ...state, [target.name]: target.value }))
    setEnterError(null)
  }

  useEffect(() => {
    setEnterError(loginError)
  }, [loginError])

  const validatorConfig = {
    email: {
      isRequired: {
        messege: 'Поле электронная почта обязательно для заполнения'
      }
    },
    password: {
      isRequired: {
        messege: 'Поле пароль обязательно для заполнения'
      }
    }
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
    const redirect = history.location.state
      ? history.location.state.from.pathname
      : '/'
    dispatch(logIn({ payload: data, redirect }))
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
      {enterError && <p className='text-danger'>{enterError}</p>}
      <button
        type='submit'
        disabled={isValid || enterError}
        className='btn btn-primary w-100 mx-auto'
      >
        Войти
      </button>
    </form>
  )
}

export default LoginForm
