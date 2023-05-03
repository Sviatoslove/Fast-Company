import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import api from '../../../api'
import QualitiesList from '../../ui/qualities/QualitiesList'
import { Container, LeftColumn, RightColumn } from '../../../../layoutStyles'
import { Comments, MeetingsCard, QualitiesCard, UserCard } from '../../ui'

const UserPage = ({ userId }) => {
  const [user, setUser] = useState({})

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data))
  }, [])

  return (
    <>
      {Object.keys(user).length ? (
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
