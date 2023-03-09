import React from 'react'
import Users from '../layouts/users'
import User from './user'
import { useParams } from 'react-router-dom'

const UsersList = () => {
  const { userId } = useParams()
  return <>{userId ? <User id={userId} /> : <Users />}</>
}

export default UsersList
