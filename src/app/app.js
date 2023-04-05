import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import NavBar from './components/ui/NavBar'
import Login from './layouts/Login'
import Main from './layouts/Main'
import Users from './layouts/Users'

const App = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path='/users/:userId?/:edit?' component={Users} />
        <Route path='/login/:type?' component={Login} />
        <Route path='/' component={Main} />
        <Redirect to='/' />
      </Switch>
    </div>
  )
}

export default App
