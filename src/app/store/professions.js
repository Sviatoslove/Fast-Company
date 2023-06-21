import { createSlice } from '@reduxjs/toolkit'
import { professionsService } from '../services'
import { isOutdated } from '../utils/isOutdated'

const professionsSlice = createSlice({
  name: 'professions',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    professionsRequested: (state) => {
      state.isLoading = true
    },
    professionsReceved: (state, action) => {
      state.entities = action.payload
      state.lastFetch = Date.now()
      state.isLoading = false
    },
    professionsRequestedFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

const { actions, reducer: professionsReducer } = professionsSlice
const { professionsRequested, professionsReceved, professionsRequestedFailed } =
  actions

export const loadProfessionsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().professions
  if (isOutdated(lastFetch)) {
    dispatch(professionsRequested())
    try {
      const { content } = await professionsService.get()
      dispatch(professionsReceved(content))
      return content
    } catch (error) {
      dispatch(professionsRequestedFailed(error.message))
    }
  }
}

export const selectGetProfessions = () => (state) => state.professions.entities
export const selectGetProfessionsLoadingStatus = () => (state) =>
  state.professions.isLoading

export const selectGetProfessionById = (id) => (state) =>
  state.professions.entities.find((p) => p._id === id)

export default professionsReducer
