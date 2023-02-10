import User from "./user"

const Users = ({users, handleDelete, handleToggleBookmark}) => {
 return <>
    {users.map(user => <User key={user._id} {...user} handleDelete={handleDelete} handleToggleBookmark={handleToggleBookmark}/>)}
  </>
}

export default Users