import React from 'react'
import PropTypes from 'prop-types'

const Bookmark = ({ status, ...rest }) => {
  return (
    <>
      <button {...rest}>
        <i className={'m-2 bi bi-bookmark' + (status ? '-heart-fill' : '')}></i>
      </button>
    </>
  )
}

Bookmark.propTypes = {
  status: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Bookmark
