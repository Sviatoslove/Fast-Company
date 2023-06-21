import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  loadProfessionsList,
  selectGetProfessionById,
  selectGetProfessionsLoadingStatus
} from '../../store/professions'

const Profession = ({ id }) => {
  const dispatch = useDispatch()
  const professionsIsLoadingStatus = useSelector(
    selectGetProfessionsLoadingStatus()
  )

  if (professionsIsLoadingStatus) return 'Loading...'

  const prof = useSelector(selectGetProfessionById(id))

  useEffect(() => {
    dispatch(loadProfessionsList())
  }, [])

  return <p>{prof.name}</p>
}

Profession.propTypes = {
  id: PropTypes.string
}

export default Profession
