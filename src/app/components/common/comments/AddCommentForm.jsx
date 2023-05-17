import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { SelectedField, TextAreaField } from '../form'
import api from '../../../api'
import { validatorConfig, validator } from '../../../utils'

const initialData = { userId: '', content: '' }

const AddCommentForm = ({ onSubmit }) => {
  const [data, setData] = useState(initialData)
  const [errors, setErrors] = useState({})
  const [users, setUsers] = useState([])

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
  }, [])

  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return !!Object.keys(errors).length
  }

  const clearForm = () => {
    setData(initialData)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const isValid = validate()
    if (isValid) return
    onSubmit(data)
    clearForm()
  }

  useEffect(() => {
    validate()
  }, [data])

  const isValid = !!Object.keys(errors).length

  return (
    <form onSubmit={handleSubmit}>
      <SelectedField
        label={<h1>New comment</h1>}
        options={users}
        name='userId'
        onChange={handleChange}
        value={data.userId}
        defaultOption='Выберите пользователя'
        error={errors.userId}
      />
      <TextAreaField
        onChange={handleChange}
        value={data.content}
        error={errors.content}
      />
      <div className='d-grid justify-content-md-end mt-4'>
        <button type='submit' className='btn btn-info' disabled={isValid}>
          Опубликовать
        </button>
      </div>
    </form>
  )
}

AddCommentForm.propTypes = {
  onSubmit: PropTypes.func
}

export default AddCommentForm
