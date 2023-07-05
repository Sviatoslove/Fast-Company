import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NavBar from './components/ui/NavBar'
import ProtectedRoute from './components/common/ProtectedRoute'
import Logout from './layouts/Logout'
import Users from './layouts/Users'
import Login from './layouts/Login'
import Main from './layouts/Main'
import AppLoader from './components/ui/hoc/AppLoader'

const App = () => {
  return (
    <AppLoader>
      <div className='position-relative z-0'>
        <NavBar />
        <Switch>
          <ProtectedRoute path='/users/:userId?/:edit?' component={Users} />
          <Route path='/login/:type?' component={Login} />
          <Route path='/logout' component={Logout} />
          <Route path='/' component={Main} />
          <Redirect to='/' />
        </Switch>
        <ToastContainer />
      </div>
    </AppLoader>
  )
}

export default App
