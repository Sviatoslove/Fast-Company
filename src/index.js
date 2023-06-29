import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './index.scss'
import 'bootstrap/dist/css/bootstrap.css'
import reportWebVitals from './reportWebVitals'
import App from './app/App'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from './app/store/createStore'
import { history } from './app/utils'

const store = createStore()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <Router history={history}>
      {/*<React.StrictMode>*/}
      <App />
      {/*</React.StrictMode>*/}
    </Router>
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
