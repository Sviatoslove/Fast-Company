import React from 'react'
import PropTypes from 'prop-types'
import QualitiesList from '../../ui/qualities/QualitiesList'
import { Container, LeftColumn, RightColumn } from '../../../../layoutStyles'
import { Comments, MeetingsCard, QualitiesCard, UserCard } from '../../ui'
import { useUsers } from '../../../hooks'

const UserPage = ({ userId }) => {
  const { getById, isLoading } = useUsers()
  const user = getById(userId)
  if (isLoading) return 'Loading...'
  return (
    <Container classContainer='p-3 mt-5'>
      <LeftColumn>
        <UserCard user={user} />
        <QualitiesCard>
          <QualitiesList qualities={user.qualities} />
        </QualitiesCard>
        <MeetingsCard completedMeetings={user.completedMeetings} />
      </LeftColumn>
      <RightColumn>
        <Comments />
      </RightColumn>
    </Container>
  )
}

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
}

export default UserPage
