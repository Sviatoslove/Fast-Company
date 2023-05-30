import React from 'react'
import { Container } from '../components/common/Containers'
import useMockData from '../utils/mockData'

const Main = () => {
  const { error, initialize, progress, status } = useMockData()
  const handleClick = () => {
    initialize()
  }

  return (
    <Container
      classRow=''
      classContainer='text-center w-content shadow-custom p-3 br-10 mt-5 bc-white'
    >
      <h1>Main page</h1>
      <h3>Инициализация данных в Firebase</h3>
      <ul className='list-group list-group-flush'>
        <li className='list-group-item bc-white'>Status: {status}</li>
        <li className='list-group-item bc-white'>Progress: {progress}</li>
        {error && <li className='list-group-item bc-white'>{error}</li>}
      </ul>
      <button className='btn btn-primary' onClick={handleClick}>
        Инициализация
      </button>
    </Container>
  )
}

export default Main
