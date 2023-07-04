import React, { useEffect } from 'react'
import _ from 'lodash'
import { AddCommentForm, CommentsList } from '../common/comments'
import { useDispatch, useSelector } from 'react-redux'
import {
  createComment,
  deleteComment,
  loadCommentsList,
  selectComments,
  selectCommentsLoadingStatus
} from '../../store/comments'
import { useParams } from 'react-router-dom'
import { selectUserId } from '../../store/users'

const Comments = () => {
  const { userId } = useParams()
  const currentUserId = useSelector(selectUserId())
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadCommentsList(userId))
  }, [])
  const isLoading = useSelector(selectCommentsLoadingStatus())
  const comments = useSelector(selectComments())

  const handleRemoveComment = (id) => {
    dispatch(deleteComment(id))
  }

  const handleSubmit = (data) => {
    dispatch(createComment({ data, userId, currentUserId }))
  }

  const sortComments = _.orderBy(comments, ['created_at'], ['desc'])

  return (
    <>
      <div className='card mb-2'>
        <div className='card-body '>
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      <div className='card mb-3'>
        <div className='card-body '>
          <h2>Comments</h2>
          <hr />
          {!isLoading ? (
            <CommentsList
              comments={sortComments}
              onRemove={handleRemoveComment}
            />
          ) : (
            'Loading...'
          )}
        </div>
      </div>
    </>
  )
}

export default Comments
