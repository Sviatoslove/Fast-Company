export default function getNameById(id, users) {
  return { ...users.find((user) => id === user._id) }.name
}
