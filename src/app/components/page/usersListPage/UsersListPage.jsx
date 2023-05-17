import React, { useState, useEffect } from 'react'
import Pagination from '../../common/Pagination'
import api from '../../../api'
import { paginate, objectsEqual } from '../../utils'
import GroupList from '../../common/GroupList'
import SearchStatus from '../../ui/SearchStatus'
import UsersTable from '../../ui/UsersTable'
import _ from 'lodash'
import { SearchInput } from '../../common/form'
import { useUsers } from '../../../hooks/useUsers'

const UsersList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const pageSize = 8

  const { users } = useUsers()

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data))
  }, [])

  const handleDelete = (id) => {
    console.log('id:', id)
    //setUsers((users) => users.filter((el) => el._id !== id))
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
    //setUsers(currentUsers)
    console.log('currentUsers:', currentUsers)
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf, searchQuery])

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const handleProfessionSelect = (item) => {
    if (setSearchQuery) setSearchQuery('')
    setSelectedProf(item)
  }

  const handleSearchChange = ({ target }) => {
    if (setSelectedProf) setSelectedProf()
    setSearchQuery(target.value)
  }

  const handleSort = (item) => {
    setSortBy(item)
  }

  const clearFilter = () => {
    if (setSearchQuery) setSearchQuery('')
    setSelectedProf()
  }

  const filteredUsers = searchQuery
    ? users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : selectedProf
    ? users.filter((user) =>
        objectsEqual(user.profession, selectedProf) ? user.profession : ''
      )
    : users

  const count = filteredUsers.length

  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])

  const userCrop = paginate(sortedUsers, currentPage, pageSize)

  return (
    <div className='d-flex px-4 p-3 shadow-custom mt-5 mx-auto w-90vw'>
      {professions && (
        <div className='d-flex flex-column flex-shrink=0 pe-3'>
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

        <SearchInput onChange={handleSearchChange} value={searchQuery} />

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

export default UsersList
