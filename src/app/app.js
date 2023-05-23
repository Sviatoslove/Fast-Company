import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import NavBar from './components/ui/NavBar'
import Login from './layouts/Login'
import Main from './layouts/Main'
import Users from './layouts/Users'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider, ProfessionsProvider, QualitiesProvider } from './hooks'
import { Container } from '../layoutStyles'

const App = () => {
  return (
    <>
      <Container
        classContainer='mw-none bc-l-blue w-100vw h-100vh position-absolute z-n1'
        classRow=''
      />
      <div className='position-relative z-0'>
        <AuthProvider>
          <NavBar />
          <ProfessionsProvider>
            <QualitiesProvider>
              <Switch>
                <Route path='/users/:userId?/:edit?' component={Users} />
                <Route path='/login/:type?' component={Login} />
                <Route path='/' component={Main} />
                <Redirect to='/' />
              </Switch>
            </QualitiesProvider>
          </ProfessionsProvider>
        </AuthProvider>
        <ToastContainer />
      </div>
    </>
  )
}

export default App
