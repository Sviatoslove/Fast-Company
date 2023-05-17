import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import usersService from '../services/users.service'
import { toast } from 'react-toastify'
import { errorCatcher } from '../components/utils'

const UsersContext = React.createContext()

const useUsers = () => useContext(UsersContext)

const UsersProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    if (error) {
      toast.error(error)
      setError(null)
    }
  }, [error])

  const getUsers = async () => {
    try {
      const { content } = await usersService.get()
      setUsers(content)
      setIsLoading(false)
      return content
    } catch (error) {
      errorCatcher(error, setError)
    }
  }

  const getById = (id) => {
    return users.find((user) => user._id === id)
  }

  return (
    <UsersContext.Provider value={{ users, getById }}>
      {!isLoading ? children : <h3>Users is loading...</h3>}
    </UsersContext.Provider>
  )
}

UsersProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export { useUsers, UsersProvider }
