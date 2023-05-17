import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import NavBar from './components/ui/NavBar'
import Login from './layouts/Login'
import Main from './layouts/Main'
import Users from './layouts/Users'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ProfessionsProvider } from './hooks/useProfessions'
import { QualitiesProvider } from './hooks/useQualities'

const App = () => {
  return (
    <div>
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
      <ToastContainer />
    </div>
  )
}

export default App
