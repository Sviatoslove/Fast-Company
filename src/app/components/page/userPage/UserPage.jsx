import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import api from '../../../api'
import { MeetingsCard, QualitiesCard, UserCard } from '../UserInfoCards'
import QualitiesList from '../../ui/qualities/QualitiesList'
import { Container, LeftColumn, RightColumn } from '../../../../layoutStyles'
import { CommentsListComponent } from '../../ui/comments'
import _ from 'lodash'
import { validator, validatorConfig } from '../../utils'

const initialData = { userId: '', content: '' }

const UserPage = ({ userId }) => {
  const history = useHistory()
  const { location } = useHistory()

  const [users, setUsers] = useState([])
  const [user, setUser] = useState()
  const [data, setData] = useState(initialData)
  const [errors, setErrors] = useState({})
  const [comments, setComments] = useState([])

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
  }, [])

  useEffect(() => {
    if (Object.values(data).every((el) => el === '')) {
      api.comments
        .fetchCommentsForUser(userId)
        .then((data) => setComments(data))
    }
  }, [data])

  useEffect(() => {
    setUser(users.find((user) => userId === user._id))
  }, [users])

  const handleUserChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }

  const handleToEdit = () => {
    history.push(location.pathname + '/edit')
  }

  const handleDeleteComment = (id) => {
    api.comments.remove(id)
    setComments((prevState) =>
      prevState.filter((comment) => comment._id !== id)
    )
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return !!Object.keys(errors).length
  }

  useEffect(() => {
    validate()
  }, [data])

  const isValid = !!Object.keys(errors).length

  const handleAddComment = (event) => {
    event.preventDefault()
    const isVal = validate()
    if (isVal) return
    const newComment = { ...data, pageId: userId }
    api.comments.add(newComment)
    setData(initialData)
  }

  const sortComments = _.orderBy(comments, ['created_at'], ['desc'])

  return (
    <>
      {user ? (
        <Container>
          <LeftColumn>
            <UserCard
              userName={user.name}
              profession={user.profession.name}
              rate={user.rate}
              onClick={handleToEdit}
            />
            <QualitiesCard>
              <QualitiesList qualities={user.qualities} />
            </QualitiesCard>
            <MeetingsCard completedMeetings={user.completedMeetings} />
          </LeftColumn>
          <RightColumn>
            <CommentsListComponent
              users={users}
              valueSelect={data.userId}
              valueArea={data.content}
              handleChange={handleUserChange}
              comments={sortComments}
              handleDeleteComment={handleDeleteComment}
              handleAddComment={handleAddComment}
              name='userId'
              errors={errors}
              disabled={isValid}
            />
          </RightColumn>
        </Container>
      ) : (
        'loading...'
      )}
    </>
  )
}

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
}

export default UserPage
