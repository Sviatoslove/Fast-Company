import React from 'react'
import PropTypes from 'prop-types'
import { useAuth } from '../../hooks'
import { Redirect, Route, useParams } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
  const { currentUser } = useAuth()
  const { userId } = useParams()
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser || (userId && userId !== currentUser._id)) {
          console.log(1)
          return (
            <Redirect
              to={{
                pathname: userId ? `/users/${currentUser._id}/edit` : '/login',
                state: {
                  from: props.location
                }
              }}
            />
          )
        }
        return Component ? <Component {...props} /> : children
      }}
    />
  )
}

ProtectedRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default ProtectedRoute
