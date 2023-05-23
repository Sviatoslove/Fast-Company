import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { toast } from 'react-toastify'
import usersService from '../services/users.service'
import { errorCatcher } from '../utils'

const httpAuth = axios.create()

const AuthContext = React.createContext()

const useAuth = () => useContext(AuthContext)

const TOKEN_KEY = 'jwt-token'
const REFRESH_KEY = 'jwt-refresh-token'
const EXPIRES_KEY = 'jwt-expires'

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({})
  const [error, setError] = useState(null)

  useEffect(() => {
    if (error) {
      toast.error(error)
      setError(null)
    }
  }, [error])

  const setTokens = ({ expiresIn = 3600, idToken, refreshToken }) => {
    const expiresDate = new Date().getTime() + expiresIn * 1000
    localStorage.setItem(TOKEN_KEY, idToken)
    localStorage.setItem(REFRESH_KEY, refreshToken)
    localStorage.setItem(EXPIRES_KEY, expiresDate)
  }

  const createUser = async (data) => {
    try {
      const { content } = await usersService.create(data)
      setCurrentUser(data)
      return content
    } catch (error) {
      errorCatcher(error, setError)
    }
  }

  const signUp = async ({ email, password, ...rest }) => {
    const key = 'AIzaSyDdtWasXBv6zEKjvr-Q5oph0z3nNWezl5A'
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`

    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      })
      setTokens(data)
      createUser({ _id: data.localId, email, ...rest })
      console.log('data:', data)
    } catch (error) {
      errorCatcher(error, setError)
    }
  }

  return (
    <AuthContext.Provider value={{ signUp, currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export { useAuth, AuthProvider }
