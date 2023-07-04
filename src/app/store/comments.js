import { createAction, createSlice } from '@reduxjs/toolkit'
import { commentService } from '../services'
import { generateAuthError } from '../utils/generateAuthError'
import { nanoid } from 'nanoid'

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true
    },
    commentsReceved: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    commentsRequestedFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    commentCreateSucess: (state, action) => {
      if (!state.entities) state.entities = []
      state.entities.push(action.payload)
      state.isLoading = false
    },
    commentCreateFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    commentDeleteSucess: (state, action) => {
      state.entities = state.entities.filter((c) => c._id !== action.payload)
      state.isLoading = false
    },
    commentDeleteFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

const { actions, reducer: commentsReducer } = commentsSlice
const {
  commentsRequested,
  commentsReceved,
  commentsRequestedFailed,
  commentCreateSucess,
  commentCreateFailed,
  commentDeleteSucess,
  commentDeleteFailed
} = actions

const commentCreateRequested = createAction('comments/commentCreateRequested')
const commentDeleteRequested = createAction('comments/commentDeleteRequested')

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested())
  try {
    const { content } = await commentService.getComment(userId)
    dispatch(commentsReceved(content))
    return content
  } catch (error) {
    const { code, message } = error.response.data.error
    if (code === 400) {
      const errorMessage = generateAuthError(message)
      dispatch(commentsRequestedFailed(errorMessage))
    }
  }
}

export const createComment =
  ({ data, userId, currentUserId }) =>
  async (dispatch) => {
    dispatch(commentCreateRequested())
    const comment = {
      ...data,
      _id: nanoid(),
      pageId: userId,
      created_at: Date.now(),
      userId: currentUserId
    }
    try {
      const { content } = await commentService.createComment(comment)
      dispatch(commentCreateSucess(content))
      return content
    } catch (error) {
      const { code, message } = error.response.data.error
      if (code === 400) {
        const errorMessage = generateAuthError(message)
        dispatch(commentCreateFailed(errorMessage))
      }
    }
  }

export const deleteComment = (id) => async (dispatch) => {
  dispatch(commentDeleteRequested())
  try {
    const { content } = await commentService.deleteComment(id)
    dispatch(commentDeleteSucess(id))
    return content
  } catch (error) {
    const { code, message } = error.response.data.error
    if (code === 400) {
      const errorMessage = generateAuthError(message)
      dispatch(commentDeleteFailed(errorMessage))
    }
  }
}

export const selectComments = () => (state) => state.comments.entities
export const selectCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading

export default commentsReducer
