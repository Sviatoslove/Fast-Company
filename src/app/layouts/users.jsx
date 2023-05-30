import React from 'react'
import UserPage from '../components/page/userPage/UserPage'
import UsersList from '../components/page/usersListPage/UsersListPage'
import { useParams } from 'react-router-dom'
import EditUserPage from '../components/page/editUserPage/EditUserPage'
import { UsersProvider } from '../hooks'
import ProtectedRoute from '../components/common/ProtectedRoute'

const Users = () => {
  const { userId, edit } = useParams()

  return (
    <UsersProvider>
      {userId ? (
        edit ? (
          <ProtectedRoute
            path='/users/:userId?/:edit?'
            component={EditUserPage}
          />
        ) : (
          <UserPage userId={userId} />
        )
      ) : (
        <UsersList />
      )}
    </UsersProvider>
  )
}

export default Users
