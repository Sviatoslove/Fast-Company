import React from 'react'
import { NavLink } from 'react-router-dom'
import { Container } from '../../../layoutStyles'

const NavBar = () => {
  return (
    <Container classContainer='bc-yellow mw-none ff-BS' classRow=''>
      <ul className='nav'>
        <li className='nav-item'>
          <NavLink className='nav-link' to='/'>
            Main
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink className='nav-link' to='/login'>
            Login
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink className='nav-link' to='/users'>
            Users
          </NavLink>
        </li>
      </ul>
    </Container>
  )
}

export default NavBar
