import { createAction, createSlice } from '@reduxjs/toolkit'
import { localStorageService, usersService } from '../services'
import authService from '../services/auth.service'
import { history, randomInt } from '../utils'

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false
    }

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true
    },
    usersReceved: (state, action) => {
      state.entities = action.payload
      state.dataLoaded = true
      state.isLoading = false
    },
    usersRequestedFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    authRequestedSucess: (state, action) => {
      state.auth = action.payload
      state.isLoggedIn = true
      state.isLoading = false
    },
    authRequestedFailed: (state, action) => {
      state.error = action.payload
    },
    userCreatedSucess: (state, action) => {
      if (!state.entities) state.entities = []
      state.entities.push(action.payload)
    },
    //authRequested: (state) => {
    //  state.isLoading = true
    //},
    userLoggedOut: (state) => {
      state.entities = null
      state.isLoggedIn = false
      state.auth = null
      state.dataLoaded = false
    },
    userUpdatedSucess: (state, action) => {
      state.entities = [
        ...state.entities.filter((u) => u._id !== action.payload._id),
        action.payload
      ]
    }
  }
})

const { actions, reducer: usersReducer } = usersSlice

const {
  usersRequested,
  usersReceved,
  usersRequestedFailed,
  authRequestedSucess,
  authRequestedFailed,
  userCreatedSucess,
  userLoggedOut,
  userUpdatedSucess
} = actions

const authRequested = createAction('auth/authRequested')
const userCreateRequested = createAction('users/userCreateRequested')
const userCreatedFailed = createAction('users/userCreatedFailed') //эта ошибка только наша, и нужна нам для отладки
const userUpdateRequested = createAction('users/userUpdateRequested')
const userUpdatedFailed = createAction('users/userUpdatedFailed')

const createUser = (payload) => async (dispatch) => {
  dispatch(userCreateRequested())
  try {
    const { content } = await usersService.create(payload)
    dispatch(userCreatedSucess(content))
    history.push('/users')
    return content
  } catch (error) {
    dispatch(userCreatedFailed(error.message))
  }
}

export const signUp =
  ({ email, password, ...rest }) =>
  async (dispatch) => {
    dispatch(authRequested())
    try {
      const data = await authService.register({ email, password })
      localStorageService.setTokens(data)
      dispatch(authRequestedSucess({ userId: data.localId }))
      dispatch(
        createUser({
          _id: data.localId,
          email,
          image: `https://avatars.dicebear.com/api/avataaars/${(
            Math.random() + 1
          )
            .toString(36)
            .substring(7)}.svg`,
          rate: randomInt(1, 5),
          completedMeetings: randomInt(0, 200),
          ...rest
        })
      )
    } catch (error) {
      dispatch(authRequestedFailed(error.message))
    }
  }

export const logIn =
  ({ payload, redirect }) =>
  async (dispatch) => {
    const { email, password } = payload
    dispatch(authRequested())
    try {
      const data = await authService.logIn({ email, password })
      dispatch(authRequestedSucess({ userId: data.localId }))
      localStorageService.setTokens(data)
      history.push(redirect)
    } catch (error) {
      dispatch(authRequestedFailed(error.message))
    }
  }

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData()
  dispatch(userLoggedOut())
  history.push('/')
}

export const userUpdated = (payload) => async (dispatch) => {
  dispatch(userUpdateRequested())
  try {
    const { content } = await usersService.update(payload)
    dispatch(userUpdatedSucess(content))
    history.push(`/users/${payload._id}`)
    return content
  } catch (error) {
    dispatch(userUpdatedFailed(error.message))
  }
}

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested())
  try {
    const { content } = await usersService.get()
    dispatch(usersReceved(content))
    return content
  } catch (error) {
    dispatch(usersRequestedFailed(error.message))
  }
}

export const selectIsLoggedIn = () => (state) => state.users.isLoggedIn
export const selectDataStatus = () => (state) => state.users.dataLoaded
export const selectUsersLoadingStatus = () => (state) => state.users.isLoading

export const selectUsersList = () => (state) => state.users.entities
export const selectUserId = () => (state) => state.users.auth.userId
export const selectUserById = (id) => (state) =>
  state.users.entities.find((u) => u._id === id)
export const selectCurrentUser = () => (state) =>
  state.users.entities.find((u) => u._id === state.users.auth.userId)

export default usersReducer
