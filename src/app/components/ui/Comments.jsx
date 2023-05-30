import React from 'react'
import _ from 'lodash'
import { AddCommentForm, CommentsList } from '../common/comments'
import { useComments } from '../../hooks'

const Comments = () => {
  const { createComment, comments, deleteComment } = useComments()

  const handleRemoveComment = (id) => {
    deleteComment(id)
  }

  const handleSubmit = (data) => {
    createComment(data)
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
          <CommentsList
            comments={sortComments}
            onRemove={handleRemoveComment}
          />
        </div>
      </div>
    </>
  )
}

export default Comments
