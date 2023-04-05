import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'
import { formatDataForFields } from '../../utils'

const MultiSelectField = ({
  name,
  options,
  onChange,
  label,
  error,
  defaultValue
}) => {
  const optionsArray = options && formatDataForFields(options)
  defaultValue = formatDataForFields(defaultValue)

  const handleChange = (value) => {
    onChange({ target: { name, value } })
  }

  return (
    <div className='mb-2'>
      <label className='mb-2'>{label}</label>
      <Select
        isMulti
        closeMenuOnSelect={false}
        name={name}
        options={optionsArray}
        className='basic-multi-select is-invalid'
        classNamePrefix='select'
        defaultValue={defaultValue}
        onChange={handleChange}
      />
      {error && <div className='invalid-feedback'>{error}</div>}
    </div>
  )
}

MultiSelectField.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([
    PropTypes.array.isRequired,
    PropTypes.object.isRequired
  ]),
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.array
}

export default MultiSelectField
