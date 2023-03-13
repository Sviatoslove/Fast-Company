import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NavBar from './components/navBar'
import Login from './layouts/login'
import Main from './layouts/main'
import Users from './layouts/users'

const App = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path='/users/:userId?' component={Users} />
        <Route path='/login' component={Login} />
        <Route path='/' component={Main} />
      </Switch>
    </div>
  )
}

export default App
