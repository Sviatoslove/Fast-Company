import React from 'react'
import UserPage from '../components/page/userPage/UserPage'
import UsersList from '../components/page/usersListPage/UsersListPage'
import { useParams } from 'react-router-dom'
import EditUserPage from '../components/page/editUserPage/EditUserPage'

const Users = () => {
  const { userId, edit } = useParams()
  return (
    <>
      {userId ? (
        edit ? (
          <EditUserPage userId={userId} />
        ) : (
          <UserPage userId={userId} />
        )
      ) : (
        <UsersList />
      )}
    </>
  )
}

export default Users
