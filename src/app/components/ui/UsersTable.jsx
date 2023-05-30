import React from 'react'
import PropTypes from 'prop-types'
import Bookmark from '../common/Bookmark'
import QualitiesList from './qualities/QualitiesList'
import Table from '../common/table/Table'
import { Link } from 'react-router-dom'
import Profession from './Profession'

const UsersTable = ({ users, onSort, selectedSort, onToggleBookmark }) => {
  const columns = {
    name: {
      path: 'name',
      name: 'Имя',
      component: (user) => (
        <Link className='nav-link ff-BS' to={`/users/${user._id}`}>
          {user.name}
        </Link>
      )
    },
    qualities: {
      name: 'Качества',
      component: (user) => <QualitiesList qualities={user.qualities} />
    },
    profession: {
      name: 'Профессия',
      component: (user) => <Profession id={user.profession} />
    },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: (user) => (
        <Bookmark
          status={user.bookmark}
          onClick={() => onToggleBookmark(user._id)}
        />
      )
    }
  }

  return <Table {...{ onSort, selectedSort, columns, data: users }} />
}

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookmark: PropTypes.func.isRequired
}

export default UsersTable
