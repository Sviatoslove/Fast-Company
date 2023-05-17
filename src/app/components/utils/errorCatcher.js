export default function errorCatcher(error, setError) {
  const { message } = error.response.data
  setError(message)
}
