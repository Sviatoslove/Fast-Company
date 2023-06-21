import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Quality from './Quality'
import { useDispatch, useSelector } from 'react-redux'
import {
  getQualitiesByIds,
  selectGetQualitiesLoadingStatus,
  loadQualitiesList
} from '../../../store/qualities'

const QualitiesList = ({ qualities }) => {
  const dispatch = useDispatch()
  const qualitiesIsLoadingStatus = useSelector(
    selectGetQualitiesLoadingStatus()
  )
  if (qualitiesIsLoadingStatus) return 'Loading'

  const qualitiesList = useSelector(getQualitiesByIds(qualities))

  useEffect(() => {
    dispatch(loadQualitiesList())
  }, [])

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
