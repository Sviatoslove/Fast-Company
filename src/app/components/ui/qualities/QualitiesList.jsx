import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Quality from './Quality'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectQualitiesByIds,
  selectQualitiesLoadingStatus,
  loadQualitiesList
} from '../../../store/qualities'

const QualitiesList = ({ qualities }) => {
  const dispatch = useDispatch()
  const qualitiesIsLoadingStatus = useSelector(selectQualitiesLoadingStatus())
  const qualitiesList = useSelector(selectQualitiesByIds(qualities))

  useEffect(() => {
    dispatch(loadQualitiesList())
  }, [])

  return (
    <>
      {!qualitiesIsLoadingStatus
        ? qualitiesList.map((qual) => {
            return <Quality key={qual._id} {...qual} />
          })
        : 'Loading...'}
    </>
  )
}

QualitiesList.propTypes = {
  qualities: PropTypes.array
}

export default QualitiesList
