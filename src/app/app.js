import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NavBar from './components/navBar'
import UsersList from './components/usersList'
import Login from './layouts/login'
import Main from './layouts/main'

const App = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path='/users/:userId?' component={UsersList} />
        <Route path='/login' component={Login} />
        <Route path='/' component={Main} />
      </Switch>
    </div>
  )
}

export default App
