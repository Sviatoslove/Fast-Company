import React from 'react'
import PropTypes from 'prop-types'
import QualitiesList from '../../ui/qualities/QualitiesList'
import { Container, LeftColumn, RightColumn } from '../../common/Containers'
import { Comments, MeetingsCard, QualitiesCard, UserCard } from '../../ui'
import { CommentsProvider } from '../../../hooks/useComments'
import { selectUserById, selectUsersLoadingStatus } from '../../../store/users'
import { useSelector } from 'react-redux'

const UserPage = ({ userId }) => {
  const isLoading = useSelector(selectUsersLoadingStatus())
  if (isLoading) return 'Loading...'
  const user = useSelector(selectUserById(userId))
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
        <CommentsProvider>
          <Comments />
        </CommentsProvider>
      </RightColumn>
    </Container>
  )
}

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
}

export default UserPage
