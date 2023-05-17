import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import QualitiesList from '../../ui/qualities/QualitiesList'
import { Container, LeftColumn, RightColumn } from '../../../../layoutStyles'
import { Comments, MeetingsCard, QualitiesCard, UserCard } from '../../ui'
import API from '../../../api'

const UserPage = ({ userId }) => {
  const [user, setUser] = useState()

  useEffect(() => {
    API.users.getById(userId).then((data) => setUser(data))
  }, [])

  return (
    <Container>
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
