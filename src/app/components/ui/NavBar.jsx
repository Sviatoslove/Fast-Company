import React from 'react'
import { NavLink } from 'react-router-dom'
import { Container } from '../../components/common/Containers'
import { useAuth } from '../../hooks/useAuth'
import NavProfile from './NavProfile'

const NavBar = () => {
  const { currentUser } = useAuth()
  return (
    <Container classContainer='bc-yellow mw-none ff-BS' classRow=''>
      <nav className='navbar'>
        <div className='container-fluid'>
          <ul className='nav'>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/'>
                Main
              </NavLink>
            </li>
            {currentUser && (
              <li className='nav-item'>
                <NavLink className='nav-link' to='/users'>
                  Users
                </NavLink>
              </li>
            )}
          </ul>
          <div className='d-flex'>
            {currentUser ? (
              <NavProfile />
            ) : (
              <NavLink className='nav-link' to='/login'>
                Login
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </Container>
  )
}

export default NavBar
