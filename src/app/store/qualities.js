import { createSlice } from '@reduxjs/toolkit'
import { qualitiesService } from '../services'

const qualitiesSlice = createSlice({
  name: 'qualities',
  initialState: { entities: null, isLoading: true, error: null },
  reducers: {
    qualitiesRequested: (state) => {
      state.isLoading = true
    },
    qualitiesReceved: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    qualitiesRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

const { actions, reducer: qualitiesReducer } = qualitiesSlice
const { qualitiesRequested, qualitiesReceved, qualitiesRequestFailed } = actions

export const loadQualitiesList = () => async (dispatch) => {
  dispatch(qualitiesRequested())
  try {
    const { content } = await qualitiesService.fetchAll()
    dispatch(qualitiesReceved(content))
    return content
  } catch (error) {
    dispatch(qualitiesRequestFailed(error.message))
  }
}

export const getQualities = () => (state) => state.qualities.entities

export const getQualitiesLoadingStatus = () => (state) =>
  state.qualities.isLoading

export const getQualitiesByIds = (qualitiesIds) => (state) => {
  return qualitiesIds.map((qualiId) =>
    state.qualities.entities.find((qual) => qual._id === qualiId)
  )
}

export default qualitiesReducer
