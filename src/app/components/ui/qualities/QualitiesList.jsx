import React from 'react'
import PropTypes from 'prop-types'
import Quality from './Quality'
import { useQualities } from '../../../hooks'

const QualitiesList = ({ qualities }) => {
  const { isLoading } = useQualities()
  if (isLoading) return 'Loading'
  return (
    <>
      {qualities.map((id) => {
        return <Quality key={id} id={id} />
      })}
    </>
  )
}

QualitiesList.propTypes = {
  qualities: PropTypes.array
}

export default QualitiesList
