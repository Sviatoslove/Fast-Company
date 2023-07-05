import React, { useEffect, useState } from 'react'
import UserAvatar from '../common/UserAvatar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  loadUsersList,
  selectCurrentUser,
  selectDataStatus
} from '../../store/users'

const NavProfile = () => {
  const dispatch = useDispatch()
  const dataStatus = useSelector(selectDataStatus())
  useEffect(() => {
    if (!dataStatus) dispatch(loadUsersList())
  }, [])
  if (!dataStatus) return 'Loading...'
  const currentUser = useSelector(selectCurrentUser())
  const [isOpen, setOpen] = useState(false)
  const toggleMenu = () => {
    setOpen((prevState) => !prevState)
  }
  return (
    <div className='dropdown' onClick={toggleMenu}>
      <div className='btn dropdown-toggle d-flex align-items-center'>
        <div className='me-2'>{currentUser.name}</div>
        <UserAvatar image={currentUser.image} height='45' />
        <img src='' alt='' className='img-responsive rounded-circle' />
      </div>
      <div className={'w-100 dropdown-menu' + (isOpen ? ' show' : '')}>
        <Link to={`/users/${currentUser._id}`} className='dropdown-item'>
          Profile
        </Link>
        <Link to={`/logout`} className='dropdown-item'>
          Log Out
        </Link>
      </div>
    </div>
  )
}

export default NavProfile
