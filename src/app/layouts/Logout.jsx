import React, { useEffect } from 'react'
import { useAuth } from '../hooks'

const Logout = () => {
  const { logout } = useAuth()
  useEffect(() => {
    logout()
  }, [])

  return <h2>Loading...</h2>
}

export default Logout
