import React from 'react'
import PropTypes from 'prop-types'

const Container = ({ children, classContainer, classRow }) => {
  return (
    <div className={'container ' + classContainer}>
      <div className={classRow}>{children}</div>
    </div>
  )
}

Container.defaultProps = {
  classContainer: '',
  classRow: 'row gutters-sm'
}

Container.propTypes = {
  classContainer: PropTypes.string,
  classRow: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default Container
