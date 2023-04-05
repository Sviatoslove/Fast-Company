import React from 'react'

const SearchInput = ({ ...rest }) => {
  return (
    <div className='input-group input-group-sm mb-1'>
      <span className='input-group-text' id='inputGroup-sizing-sm'>
        Search...
      </span>
      <input type='text' className='form-control' {...rest} />
    </div>
  )
}

export default SearchInput
