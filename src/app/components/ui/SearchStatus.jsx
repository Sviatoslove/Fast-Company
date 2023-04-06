import React from 'react'
import PropTypes from 'prop-types'

const SearchStatus = ({ length }) => {
  const renderPhrase = (number) => {
    if (number) {
      const z = (number % 100) / 10
      const x = number % 10
      z >= 1.1 && z <= 1.4
        ? (number += ' человек тусанёт')
        : x === 2 || x === 3 || x === 4
        ? (number += ' человека тусанут')
        : (number += ' человек тусанёт')
      return number + ' с тобой сегодня'
    } else return 'Никто с тобой не тусанёт'
  }

  return (
    <>
      <h4
        className={'fs-4 badge mb-4 ' + (length ? 'bg-primary' : 'bg-danger')}
      >
        {renderPhrase(length)}
      </h4>
    </>
  )
}

SearchStatus.propTypes = {
  length: PropTypes.number.isRequired
}

export default SearchStatus
