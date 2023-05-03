import React from 'react'
import { useHistory } from 'react-router-dom'

const BackHistoryButton = () => {
  const history = useHistory()
  return (
    <button
      type='button'
      className='btn btn-warning w-80'
      onClick={() => history.goBack()}
    >
      Назад
    </button>
  )
}

export default BackHistoryButton
