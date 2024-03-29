import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { loadUsersList, selectDataStatus } from '../../../store/users'

const UsersLoader = ({ children }) => {
  const dataStatus = useSelector(selectDataStatus())
  const dispatch = useDispatch()
  useEffect(() => {
    if (!dataStatus) dispatch(loadUsersList())
  }, [])

  if (!dataStatus) return <h2>Loading...</h2>
  return children
}

UsersLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default UsersLoader
