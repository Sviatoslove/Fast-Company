import React from 'react'
import PropTypes from 'prop-types'
import NewCommentForm from './NewCommentForm'
import CommentComponents from './CommentComponents'
import { displayDate, getNameById } from '../../utils'

const CommentsListComponent = ({
  users,
  valueSelect,
  valueArea,
  comments,
  handleChange,
  handleDeleteComment,
  handleAddComment,
  name,
  disabled,
  errors
}) => {
  return (
    <>
      <div className='card mb-2'>
        <div className='card-body '>
          <NewCommentForm
            users={users}
            handleChange={handleChange}
            valueSelect={valueSelect}
            handleAddComment={handleAddComment}
            name={name}
            valueArea={valueArea}
            disabled={disabled}
            errors={errors}
          />
        </div>
      </div>
      <div className='card mb-3'>
        <div className='card-body '>
          <h2>Comments</h2>
          <hr />
          {comments?.map((comment) => (
            <CommentComponents
              key={comment._id}
              userName={getNameById(comment.userId, users)}
              publishedTime={displayDate(+comment.created_at)}
              content={comment.content}
              onClick={() => handleDeleteComment(comment._id)}
            />
          ))}
        </div>
      </div>
    </>
  )
}

CommentsListComponent.propTypes = {
  disabled: PropTypes.bool,
  errors: PropTypes.object,
  name: PropTypes.string,
  users: PropTypes.array,
  valueArea: PropTypes.string,
  valueSelect: PropTypes.string,
  handleChange: PropTypes.func,
  handleDeleteComment: PropTypes.func,
  handleAddComment: PropTypes.func,
  comments: PropTypes.array
}

export default CommentsListComponent
