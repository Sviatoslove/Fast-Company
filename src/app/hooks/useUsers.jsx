import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { usersService } from '../services'
import { toast } from 'react-toastify'
import { errorCatcher } from '../utils'
import { useAuth } from './useAuth'

const UsersContext = React.createContext()

const useUsers = () => useContext(UsersContext)

const UsersProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const { currentUser } = useAuth()

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    if (!isLoading) {
      const newUsers = [...users]
      const indexUser = newUsers.findIndex((u) => u._id === currentUser._id)
      newUsers[indexUser] = currentUser
      setUsers(newUsers)
    }
  }, [currentUser])

  useEffect(() => {
    if (error) {
      toast.error("Users don't loading. Try it later.")
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

  const getUserById = (id) => {
    return users.find((user) => user._id === id)
  }

  return (
    <UsersContext.Provider value={{ isLoading, users, getUserById }}>
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
