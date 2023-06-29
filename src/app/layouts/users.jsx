import React, { useEffect } from 'react'
import UserPage from '../components/page/userPage/UserPage'
import UsersList from '../components/page/usersListPage/UsersListPage'
import { useParams } from 'react-router-dom'
import EditUserPage from '../components/page/editUserPage/EditUserPage'
import ProtectedRoute from '../components/common/ProtectedRoute'
import UsersLoader from '../components/ui/hoc/UsersLoader'
import { useDispatch, useSelector } from 'react-redux'
import { loadUsersList, selectDataStatus } from '../store/users'

const Users = () => {
  const { userId, edit } = useParams()
  const dataStatus = useSelector(selectDataStatus())
  const dispatch = useDispatch()
  useEffect(() => {
    if (!dataStatus) dispatch(loadUsersList())
  }, [])
  if (!dataStatus) return <h2>Loading...</h2>
  return (
    <UsersLoader>
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
    </UsersLoader>
  )
}

export default Users
