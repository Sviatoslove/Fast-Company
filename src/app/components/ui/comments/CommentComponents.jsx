import React from 'react'
import PropTypes from 'prop-types'
import UserAvatar from '../../common/UserAvatar'

const CommentComponents = ({ userName, publishedTime, content, ...rest }) => {
  return (
    <div className='bg-light card-body  mb-3'>
      <div className='row'>
        <div className='col'>
          <div className='d-flex flex-start '>
            <UserAvatar />
            <div className='flex-grow-1 flex-shrink-1'>
              <div className='mb-4'>
                <div className='d-flex justify-content-between align-items-center'>
                  <p className='mb-1 '>
                    {userName}
                    <span className='small ms-5'>{publishedTime}</span>
                  </p>
                  <button
                    className='btn btn-sm text-primary d-flex align-items-center'
                    {...rest}
                  >
                    <i className='bi bi-x-lg'></i>
                  </button>
                </div>
                <p className='small mb-0'>{content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

CommentComponents.propTypes = {
  userName: PropTypes.string,
  publishedTime: PropTypes.string,
  content: PropTypes.string
}

export default CommentComponents
