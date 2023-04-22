import React from 'react'
import PropTypes from 'prop-types'

import { SelectedField, TextAreaField } from '../../common/form'

const NewCommentForm = ({
  users,
  name,
  handleChange,
  valueSelect,
  valueArea,
  handleAddComment,
  disabled,
  errors
}) => {
  return (
    <form onSubmit={handleAddComment}>
      <SelectedField
        label={<h1>New comment</h1>}
        options={users}
        name={name}
        onChange={handleChange}
        value={valueSelect}
        defaultOption='Выберите пользователя'
        error={errors.userId}
      />
      <TextAreaField
        onChange={handleChange}
        value={valueArea}
        error={errors.content}
      />
      <div className='d-grid justify-content-md-end mt-4'>
        <button type='submit' className='btn btn-info' disabled={disabled}>
          Опубликовать
        </button>
      </div>
    </form>
  )
}

NewCommentForm.propTypes = {
  disabled: PropTypes.bool,
  errors: PropTypes.object,
  name: PropTypes.string,
  users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  handleChange: PropTypes.func,
  valueSelect: PropTypes.string,
  valueArea: PropTypes.string,
  handleAddComment: PropTypes.func
}

export default NewCommentForm
