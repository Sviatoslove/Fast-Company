import React from 'react'
import PropTypes from 'prop-types'
import Bookmark from './bookmark'
import Quality from './quality'

const User = (props) => {
  return (
    <>
      <tr>
        <td>{props.name}</td>
        <td>
          {props.qualities.map((quality) => (
            <Quality key={quality._id} {...quality} />
          ))}
        </td>
        <td>{props.profession.name}</td>
        <td>{props.completedMeetings}</td>
        <td>{props.rate}/5</td>
        <td>
          <Bookmark
            status={props.bookmark}
            onClick={() => props.onToggleBookmark(props._id)}
          />
        </td>
        <td>
          <button
            className='btn btn-danger'
            onClick={() => props.onDelete(props._id)}
          >
            delete
          </button>
        </td>
      </tr>
    </>
  )
}

User.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  qualities: PropTypes.arrayOf(PropTypes.object).isRequired,
  profession: PropTypes.object.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  bookmark: PropTypes.bool,
  onToggleBookmark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default User
