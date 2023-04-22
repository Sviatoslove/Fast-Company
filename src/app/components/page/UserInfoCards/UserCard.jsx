import React from 'react'
import PropTypes from 'prop-types'
import UserAvatar from '../../common/UserAvatar'

const UserCard = ({ userName, profession, rate, ...rest }) => {
  return (
    <div className='card mb-3'>
      <div className='card-body'>
        <button
          className='position-absolute top-0 end-0 btn btn-light btn-sm'
          {...rest}
        >
          <i className='bi bi-gear'></i>
        </button>
        <div className='d-flex flex-column align-items-center text-center position-relative'>
          <UserAvatar />
          <div className='mt-3'>
            <h4>{userName}</h4>
            <p className='text-secondary mb-1'>{profession}</p>
            <div className='text-muted'>
              <i
                className='bi bi-caret-down-fill text-primary'
                role='button'
              ></i>
              <i className='bi bi-caret-up text-secondary' role='button'></i>
              <span className='ms-2'>{rate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

UserCard.propTypes = {
  userName: PropTypes.string,
  profession: PropTypes.string,
  rate: PropTypes.number
}

export default UserCard
