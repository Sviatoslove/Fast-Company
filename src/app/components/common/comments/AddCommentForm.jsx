import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { TextAreaField } from '../form'
import { validatorConfig, validator } from '../../../utils'

const AddCommentForm = ({ onSubmit }) => {
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})

  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return !!Object.keys(errors).length
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const isValid = validate()
    if (isValid) return
    onSubmit(data)
    setData({})
  }

  useEffect(() => {
    validate()
  }, [data])

  const isValid = !Object.keys(data).length || !!Object.keys(errors).length

  return (
    <form onSubmit={handleSubmit}>
      <TextAreaField
        onChange={handleChange}
        value={data.content || ''}
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
