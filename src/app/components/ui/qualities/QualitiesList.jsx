import React from 'react'
import PropTypes from 'prop-types'
import Quality from './Quality'
import { useQualities } from '../../../hooks/useQualities'

const QualitiesList = ({ qualitiesIds }) => {
  const { isLoading, getQualities } = useQualities()
  const qualities = getQualities(qualitiesIds)
  return (
    <>
      {!isLoading
        ? qualities.map((quality) => {
            return <Quality key={quality._id} {...quality} />
          })
        : 'Loading...'}
    </>
  )
}

QualitiesList.propTypes = {
  qualitiesIds: PropTypes.array.isRequired
}

export default QualitiesList
