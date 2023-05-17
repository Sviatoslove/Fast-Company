import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { errorCatcher } from '../components/utils'
import qualitiesService from '../services/qualities.service'
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
  }, [])

  const getQualitiesList = async () => {
    try {
      const { content } = await qualitiesService.get()
      setQualities(content)
      setIsLoading(false)
      return content
    } catch (error) {
      errorCatcher(error, setError)
    }
  }

  const getQualities = (arrIds) =>
    arrIds.map((id) => qualities.find((quality) => quality._id === id))

  return (
    <QualitiesContext.Provider value={{ isLoading, qualities, getQualities }}>
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
