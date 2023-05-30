import React from 'react'
import PropTypes from 'prop-types'
import UserAvatar from '../UserAvatar'
import { displayDate } from '../../../utils'
import { useAuth, useUsers } from '../../../hooks'

const Comment = ({
  _id: id,
  userId,
  content,
  created_at: created,
  onRemove
}) => {
  const { currentUser } = useAuth()
  const deleteComment = currentUser._id === userId
  const { isLoading, getUserById } = useUsers()
  const user = getUserById(userId)

  return (
    <div className='bg-light card-body  mb-3'>
      <div className='row'>
        {isLoading ? (
          'Loading...'
        ) : (
          <div className='col'>
            <div className='d-flex flex-start '>
              <UserAvatar image={user.image} height='65' />
              <div className='flex-grow-1 flex-shrink-1'>
                <div className='mb-4'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <p className='mb-1 '>
                      {user && user.name}
                      <span className='small ms-5'>{displayDate(created)}</span>
                    </p>
                    {deleteComment && (
                      <button
                        className='btn btn-sm text-primary d-flex align-items-center'
                        onClick={() => onRemove(id)}
                      >
                        <i className='bi bi-x-lg'></i>
                      </button>
                    )}
                  </div>
                  <p className='small mb-0'>{content}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

Comment.propTypes = {
  _id: PropTypes.string,
  userId: PropTypes.string,
  content: PropTypes.string,
  created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onRemove: PropTypes.func
}

export default Comment
