import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import UserAvatar from '../common/UserAvatar'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserId, userUpdated } from '../../store/users'
import Button from '../common/Button'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

const UserCard = ({ user }) => {
  const dispatch = useDispatch()
  const { userId } = useParams()
  const history = useHistory()
  const currentUserId = useSelector(selectUserId())

  const editUser = user._id === currentUserId

  const handleToEdit = () => {
    history.push(history.location.pathname + '/edit')
  }

  const buttonUpStatus = () => {
    if (user.rate === 5) {
      return { disabled: true, class: '' }
    }
    return { disabled: false, class: '-fill' }
  }

  const buttonDownStatus = () => {
    if (user.rate === 1) {
      return { disabled: true, class: '' }
    }
    return { disabled: false, class: '-fill' }
  }

  const incrementRate = () => {
    if (user.rate < 5) {
      return user.rate + 1
    }
  }
  const decrementRate = () => {
    if (user.rate > 1) {
      return user.rate - 1
    }
  }

  const handleRateDown = () => {
    dispatch(userUpdated({ _id: userId, rate: decrementRate() }))
  }

  const handleRateUp = () => {
    dispatch(userUpdated({ _id: userId, rate: incrementRate() }))
  }

  return (
    <div className='card mb-3'>
      <div className='card-body'>
        {editUser && (
          <button
            className='position-absolute top-0 end-0 btn btn-light btn-sm'
            onClick={handleToEdit}
          >
            <i className='bi bi-gear'></i>
          </button>
        )}
        <div className='d-flex flex-column align-items-center text-center position-relative'>
          <UserAvatar image={user.image} height='65' />
          <div className='mt-3'>
            <h4>{user.name}</h4>
            <p className='text-secondary mb-1'>{user.profession.name}</p>
            <div className='text-muted'>
              {!editUser ? (
                <>
                  <Button
                    handleClick={handleRateDown}
                    content={
                      <i
                        className={
                          'text-primary bi bi-caret-down' +
                          buttonDownStatus().class
                        }
                        role='button'
                      ></i>
                    }
                    disabled={buttonDownStatus().disabled}
                  />
                  <Button
                    handleClick={handleRateUp}
                    content={
                      <i
                        className={
                          'text-primary bi bi-caret-up' + buttonUpStatus().class
                        }
                        role='button'
                      ></i>
                    }
                    disabled={buttonUpStatus().disabled}
                  />
                </>
              ) : (
                <span>Rate:</span>
              )}

              <span className='ms-2'>{user.rate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

UserCard.propTypes = {
  user: PropTypes.object
}

export default UserCard
