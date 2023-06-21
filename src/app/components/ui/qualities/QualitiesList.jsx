import React from 'react'
import PropTypes from 'prop-types'
import Quality from './Quality'
import { useSelector } from 'react-redux'
import {
  getQualitiesByIds,
  getQualitiesLoadingStatus
} from '../../../store/qualities'

const QualitiesList = ({ qualities }) => {
  const qualitiesIsLoadingStatus = useSelector(getQualitiesLoadingStatus())
  const qualitiesList = useSelector(getQualitiesByIds(qualities))
  if (qualitiesIsLoadingStatus) return 'Loading'
  return (
    <>
      {qualitiesList.map((qual) => {
        return <Quality key={qual._id} {...qual} />
      })}
    </>
  )
}

QualitiesList.propTypes = {
  qualities: PropTypes.array
}

export default QualitiesList
