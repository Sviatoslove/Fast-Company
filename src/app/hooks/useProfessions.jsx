import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import professionsService from '../services/professions.service'
import { errorCatcher } from '../components/utils'
import { toast } from 'react-toastify'

const PreofessionsContext = React.createContext()

const useProfessions = () => useContext(PreofessionsContext)

const ProfessionsProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [professions, setProfessions] = useState([])
  console.log('professions:', professions)
  const [error, setError] = useState(null)

  useEffect(() => {
    getProfessionsList()
  }, [])

  useEffect(() => {
    if (error) {
      toast.error(error)
      setError(null)
    }
  }, [])

  const getProfessionsList = async () => {
    try {
      const { content } = await professionsService.get()
      setProfessions(content)
      setIsLoading(false)
      return content
    } catch (error) {
      errorCatcher(error, setError)
    }
  }

  const getProfession = (id) => {
    return professions.find((p) => p._id === id)
  }

  return (
    <PreofessionsContext.Provider
      value={{ isLoading, professions, getProfession }}
    >
      {children}
    </PreofessionsContext.Provider>
  )
}

ProfessionsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export { ProfessionsProvider, useProfessions }
