import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import _ from 'lodash'
import api from '../../api'
import { AddCommentForm, CommentsList } from '../common/comments'

const Comments = () => {
  const { userId } = useParams()
  const [comments, setComments] = useState([])

  useEffect(() => {
    api.comments.fetchCommentsForUser(userId).then((data) => setComments(data))
  }, [])

  const handleRemoveComment = (id) => {
    api.comments
      .remove(id)
      .then((id) =>
        setComments(comments.filter((comment) => comment._id !== id))
      )
  }

  const handleSubmit = (data) => {
    api.comments
      .add({ ...data, pageId: userId })
      .then((data) => setComments([...comments, data]))
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
