import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { toast } from 'react-toastify'
import { usersService, setTokens } from '../services'
import { errorCatcher } from '../utils'
import configFile from '../config.json'

const { authKey, urlSignUp, urlLogIn } = configFile

const httpAuth = axios.create()

const AuthContext = React.createContext()

const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({})
  const [error, setError] = useState(null)

  useEffect(() => {
    if (error) {
      toast.error(error)
      setError(null)
    }
  }, [error])

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
    const url = `${urlSignUp}${authKey}`

    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      })
      setTokens(data)
      createUser({ _id: data.localId, email, ...rest })
    } catch (error) {
      const { code, message } = error.response.data.error
      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          const errorObject = {
            email: 'Пользователь с таким Email уже существует'
          }
          throw errorObject
        }
      }
    }
  }

  const logIn = async ({ email, password, ...rest }) => {
    const url = `${urlLogIn}${authKey}`

    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      })

      setTokens({ ...data, ...rest })
    } catch (error) {
      const { code, message } = error.response.data.error
      if (code === 400) {
        if (message === 'EMAIL_NOT_FOUND') {
          const errorObject = {
            email: 'Пользователь с таким Email не зарегистрирован'
          }
          throw errorObject
        }
      }
    }
  }

  return (
    <AuthContext.Provider value={{ signUp, logIn, currentUser }}>
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
