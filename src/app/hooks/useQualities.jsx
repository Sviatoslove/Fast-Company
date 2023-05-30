import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { errorCatcher } from '../utils'
import { qualitiesService } from '../services'
import { toast } from 'react-toastify'

const QualitiesContext = React.createContext()

const useQualities = () => useContext(QualitiesContext)

const QualitiesProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [qualities, setQualities] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    getQualitiesList()
  }, [])

  useEffect(() => {
    if (error) {
      toast.error(error)
      setError(null)
    }
  }, [error])

  const getQualitiesList = async () => {
    try {
      const { content } = await qualitiesService.get()
      setQualities(content)
      return content
    } catch (error) {
      errorCatcher(error, setError)
    } finally {
      setIsLoading(false)
    }
  }

  const getQuality = (id) => qualities.find((q) => q._id === id)

  return (
    <QualitiesContext.Provider value={{ isLoading, qualities, getQuality }}>
      {children}
    </QualitiesContext.Provider>
  )
}

QualitiesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export { useQualities, QualitiesProvider }
