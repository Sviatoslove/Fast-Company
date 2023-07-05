import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ handleClick, content, disabled }) => {
  return (
    <button
      className='border-0 bg-transparent'
      onClick={handleClick}
      disabled={disabled}
    >
      {content}
    </button>
  )
}

Button.propTypes = {
  handleClick: PropTypes.func,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  disabled: PropTypes.bool
}

export default Button
