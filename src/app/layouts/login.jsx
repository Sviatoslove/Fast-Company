import React, { useEffect, useState } from 'react'
import TextField from '../components/textField'
import { validator, validatorConfig } from '../components/utils/validator'

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

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
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 shadow p-4'>
          <h3 className='mb-4'>Login</h3>
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
            <button
              type='submit'
              disabled={isValid}
              className='btn btn-primary w-100 mx-auto'
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
