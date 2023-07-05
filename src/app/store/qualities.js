import { createSelector, createSlice } from '@reduxjs/toolkit'
import { qualitiesService } from '../services'
import { isOutdated } from '../utils/isOutdated'

const qualitiesSlice = createSlice({
  name: 'qualities',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    qualitiesRequested: (state) => {
      state.isLoading = true
    },
    qualitiesReceved: (state, action) => {
      state.entities = action.payload
      state.lastFetch = Date.now()
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

export const loadQualitiesList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().qualities
  if (isOutdated(lastFetch)) {
    dispatch(qualitiesRequested())
    try {
      const { content } = await qualitiesService.fetchAll()
      dispatch(qualitiesReceved(content))
      return content
    } catch (error) {
      dispatch(qualitiesRequestFailed(error.message))
    }
  }
}

export const selectQualities = () => (state) => state.qualities.entities

export const selectQualitiesLoadingStatus = () => (state) =>
  state.qualities.isLoading

export const selectQualitiesByIds = (qualitiesIds) =>
  createSelector(
    (state) => state.qualities.entities,
    (state) =>
      qualitiesIds.map((qualiId) => state?.find((qual) => qual._id === qualiId))
  )

export default qualitiesReducer
