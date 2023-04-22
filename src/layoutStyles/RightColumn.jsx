import React from 'react'
import PropTypes from 'prop-types'

const RightColumn = ({ children, className }) => {
  return <div className={className}>{children}</div>
}

RightColumn.defaultProps = {
  className: 'col-md-8'
}

RightColumn.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default RightColumn
