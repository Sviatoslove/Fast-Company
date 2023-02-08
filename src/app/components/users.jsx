import User from "./user"

const Users = ({users, handleDelete, handleToggleBookmark}) => {
 return <>
    <tbody>
      {users.map(user => <User key={user._id} {...user} handleDelete={handleDelete} handleToggleBookmark={handleToggleBookmark}/>)}
    </tbody>
  </>
}

export default Users