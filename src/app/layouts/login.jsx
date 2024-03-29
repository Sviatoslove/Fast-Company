import React, { useState } from 'react'
import LoginForm from '../components/ui/LoginForm'
import { useParams } from 'react-router-dom'
import RegisterForm from '../components/ui/RegisterForm'

const Login = () => {
  const { type } = useParams()
  const [formType, setFormType] = useState(type === 'register' ? type : 'login')

  const toggleFormType = () => {
    setFormType((state) => (state === 'register' ? 'login' : 'register'))
  }

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 shadow-custom p-4 br-10 bc-white'>
          {formType === 'register' ? (
            <>
              <h3 className='mb-4'>Register</h3>
              <RegisterForm />
              <p>
                Already have a account?
                <a role='button' onClick={toggleFormType}>
                  Sign In
                </a>
              </p>
            </>
          ) : (
            <>
              <h3 className='mb-4'>Login</h3>
              <LoginForm />
              <p>
                Dont have a account?
                <a role='button' onClick={toggleFormType}>
                  Sign Up
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
