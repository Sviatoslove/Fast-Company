import React, { useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NavBar from './components/ui/NavBar'
import { AuthProvider, ProfessionsProvider, QualitiesProvider } from './hooks'
import ProtectedRoute from './components/common/ProtectedRoute'
import Logout from './layouts/Logout'
import Users from './layouts/Users'
import Login from './layouts/Login'
import Main from './layouts/Main'
import { loadQualitiesList } from './store/qualities'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadQualitiesList())
  }, [])
  return (
    <div className='position-relative z-0'>
      <AuthProvider>
        <NavBar />
        <ProfessionsProvider>
          <QualitiesProvider>
            <Switch>
              <ProtectedRoute path='/users/:userId?/:edit?' component={Users} />
              <Route path='/login/:type?' component={Login} />
              <Route path='/logout' component={Logout} />
              <Route path='/' component={Main} />
              <Redirect to='/' />
            </Switch>
          </QualitiesProvider>
        </ProfessionsProvider>
      </AuthProvider>
      <ToastContainer />
    </div>
  )
}

export default App
