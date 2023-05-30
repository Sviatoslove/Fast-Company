import React from 'react'
import PropTypes from 'prop-types'

const LeftColumn = ({ children, className }) => {
  return <div className={className}>{children}</div>
}

LeftColumn.defaultProps = {
  className: 'col-md-4 mb-3'
}

LeftColumn.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default LeftColumn
