import React from 'react'
import PropTypes from 'prop-types'
import { getInputClasses } from '../../utils'

const TextAreaField = ({ error, ...rest }) => {
  return (
    <div className='mb-4'>
      <label htmlFor='Textarea'>Сообщение</label>
      <textarea
        name='content'
        className={getInputClasses('form-control', error)}
        id='Textarea'
        style={{ height: '90px' }}
        {...rest}
      ></textarea>
      {error && <div className='invalid-feedback'>{error}</div>}
    </div>
  )
}

TextAreaField.propTypes = { error: PropTypes.string }

export default TextAreaField
