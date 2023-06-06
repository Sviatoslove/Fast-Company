import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { toast } from 'react-toastify'
import { usersService, setTokens, localStorageService } from '../services'
import { errorCatcher, randomInt } from '../utils'
import { useHistory } from 'react-router-dom'

export const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY
  }
})

const AuthContext = React.createContext()

const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const history = useHistory()

  useEffect(() => {
    if (error) {
      toast.error(error)
      setError(null)
    }
  }, [error])

  const createUser = async (data) => {
    try {
      const { content } = await usersService.create(data)
      setCurrentUser(content)
      return content
    } catch (error) {
      errorCatcher(error, setError)
    }
  }

  const signUp = async ({ email, password, ...rest }) => {
    try {
      const { data } = await httpAuth.post('accounts:signUp', {
        email,
        password,
        returnSecureToken: true
      })
      setTokens(data)
      createUser({
        _id: data.localId,
        email,
        image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
          .toString(36)
          .substring(7)}.svg`,
        rate: randomInt(1, 5),
        completedMeetings: randomInt(0, 200),
        ...rest
      })
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

  const logIn = async ({ email, password }) => {
    try {
      const { data } = await httpAuth.post('accounts:signInWithPassword', {
        email,
        password,
        returnSecureToken: true
      })

      setTokens({ ...data })
      await getUserData()
    } catch (error) {
      const { code, message } = error.response.data.error
      if (code === 400) {
        if (message === 'INVALID_PASSWORD' || message === 'INVALID_EMAIL') {
          throw new Error('Email или пароль введены не корректно')
        } else if (message.includes('TOO_MANY_ATTEMPTS_TRY_LATER')) {
          throw new Error('Слишком много попыток входа. Попробуйте позже.')
        } else if (message === 'EMAIL_NOT_FOUND') {
          throw new Error('Пользователь с таким Email не существует')
        }
      }
    }
  }

  const getUserData = async () => {
    try {
      const { content } = await usersService.getCurrentUser()
      setCurrentUser(content)
      return content
    } catch (error) {
      errorCatcher(error, setError)
    } finally {
      setIsLoading(false)
    }
  }

  const updateUser = async (data) => {
    try {
      const { content } = await usersService.update(data)
      setCurrentUser(content)
      return content
    } catch (error) {
      errorCatcher(error, setError)
    }
  }

  const logout = () => {
    localStorageService.removeAuthData()
    setCurrentUser(null)
    history.push('/')
  }

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData()
    } else {
      setIsLoading(false)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{ signUp, logIn, currentUser, logout, updateUser }}
    >
      {!isLoading ? children : 'Loading...'}
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
