import React, { useEffect, useState } from 'react'
import TextField from '../components/textField'

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' })
  const [, setErrors] = useState()

  const handleChange = ({ target }) => {
    setData((state) => ({ ...state, [target.name]: target.value }))
  }

  const validate = () => {
    const errors = {}
    for (const fieldName in data) {
      if (data[fieldName].trim() === '') {
        errors[fieldName] = `Поле ${fieldName} обязательно для заполнения`
      }
    }
    setErrors(errors)
    return !!Object.keys(data).length
  }

  useEffect(() => {
    validate()
  }, [data])

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
      />
      <TextField
        label='Пароль'
        value={data.password}
        name='password'
        type='password'
        onChange={handleChange}
      />
      <button type='submit'>Войти</button>
    </form>
  )
}

export default Login
