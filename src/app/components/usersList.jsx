import React, { useState, useEffect } from 'react'
import Pagination from './pagination'
import api from '../api'
import { paginate } from './utils/paginate'
import GroupList from './groupList'
import SearchStatus from './searchStatus'
import objectsEqual from './utils/settings.users'
import UsersTable from './usersTable'
import _ from 'lodash'
import SearchInput from './searchInput'

const UsersList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [searchValue, setSearchValue] = useState('')
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const pageSize = 8

  const [users, setUsers] = useState()

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
  }, [])

  const handleDelete = (id) => {
    setUsers((users) => users.filter((el) => el._id !== id))
  }

  const handleToggleBookmark = (id) => {
    const currentUsers = users.map((user) =>
      user._id === id
        ? {
            ...user,
            bookmark: !user.bookmark
          }
        : user
    )
    setUsers(currentUsers)
  }

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf, searchValue])

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const handleProfessionSelect = (item) => {
    setSearchValue('')
    setSelectedProf(item)
  }

  const handleSearchChange = ({ target }) => {
    setSelectedProf()
    setSearchValue(target.value)
  }

  const handleSort = (item) => {
    setSortBy(item)
  }

  const clearFilter = () => {
    setSelectedProf()
    setSearchValue('')
  }

  if (users) {
    const filteredUsers = selectedProf
      ? users.filter((user) =>
          objectsEqual(user.profession, selectedProf) ? user.profession : ''
        )
      : searchValue
      ? users.filter((user) => user.name.toLowerCase().includes(searchValue))
      : users

    const count = filteredUsers.length

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])

    const userCrop = paginate(sortedUsers, currentPage, pageSize)

    return (
      <div className='d-flex px-4'>
        {professions && (
          <div className='d-flex flex-column flex-shrink=0 p-3'>
            <GroupList
              selectedItem={selectedProf}
              items={professions}
              onItemSelect={handleProfessionSelect}
            />
            <button className='btn btn-secondary m-2' onClick={clearFilter}>
              Очистить
            </button>
          </div>
        )}
        <div className='d-flex flex-column w-100'>
          <SearchStatus length={count} />

          <SearchInput onChange={handleSearchChange} value={searchValue} />

          {count > 0 && (
            <UsersTable
              users={userCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookmark={handleToggleBookmark}
            />
          )}
          <div className='d-flex justify-content-center'>
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    )
  }
  return 'loading...'
}

export default UsersList
