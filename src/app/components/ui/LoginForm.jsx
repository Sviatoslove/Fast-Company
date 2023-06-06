import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { validator } from '../../utils'
import { TextField, CheckboxField } from '../common/form'
import { useAuth } from '../../hooks'

const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '', stayOn: false })
  const [errors, setErrors] = useState({})
  const [enterError, setEnterError] = useState(null)
  const history = useHistory()
  const { logIn } = useAuth()

  const handleChange = ({ target }) => {
    setData((state) => ({ ...state, [target.name]: target.value }))
    setEnterError(null)
  }

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

  const handleSubmit = async (event) => {
    event.preventDefault()
    const isVal = validate()
    if (isVal) return

    try {
      await logIn(data)
      history.push('/')
    } catch (error) {
      setEnterError(error.message)
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
