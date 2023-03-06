import React from 'react'
import PropTypes from 'prop-types'
import TableBody from './tableBody'
import TableHeader from './tableHeader'

const Table = ({ onSort, selectedSort, columns, data }) => {
  return (
    <table className='table text-center'>
      <TableHeader {...{ onSort, selectedSort, columns }} />
      <TableBody {...{ data, columns }} />
    </table>
  )
}

Table.propTypes = {
  onSort: PropTypes.func,
  selectedSort: PropTypes.object,
  columns: PropTypes.object,
  data: PropTypes.array
}

export default Table
