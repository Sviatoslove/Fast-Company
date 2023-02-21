import Proptypes from 'prop-types'
import React from 'react'

const GroupList = ({
  items,
  valueProperty,
  contentProperty,
  onItemSelect,
  selectedItem
}) => {
  return (
    <ul className='list-group'>
      {Object.keys(items).map((item) => (
        <li
          key={items[item][valueProperty]}
          className={
            'list-group-item' + (items[item] === selectedItem ? ' active' : '')
          }
          onClick={() => {
            onItemSelect(items[item])
          }}
          role='button'
        >
          {items[item][contentProperty]}
        </li>
      ))}
    </ul>
  )
}

GroupList.defaultProps = {
  valueProperty: '_id',
  contentProperty: 'name'
}

GroupList.propTypes = {
  items: Proptypes.oneOfType([Proptypes.object, Proptypes.array]),
  valueProperty: Proptypes.string,
  contentProperty: Proptypes.string,
  onItemSelect: Proptypes.func,
  selectedItem: Proptypes.object
}

export default GroupList
