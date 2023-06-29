import React from 'react'
import { NavLink } from 'react-router-dom'
import { Container } from '../../components/common/Containers'
import NavProfile from './NavProfile'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../store/users'

const NavBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn())
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
            {isLoggedIn && (
              <li className='nav-item'>
                <NavLink className='nav-link' to='/users'>
                  Users
                </NavLink>
              </li>
            )}
          </ul>
          <div className='d-flex'>
            {isLoggedIn ? (
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
