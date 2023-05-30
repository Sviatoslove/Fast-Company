import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { useAuth } from './useAuth'
import { nanoid } from 'nanoid'
import { errorCatcher } from '../utils'
import { toast } from 'react-toastify'
import commentService from '../services/comment.service'

const CommentsContext = React.createContext()

const useComments = () => useContext(CommentsContext)

const CommentsProvider = ({ children }) => {
  const { userId } = useParams()
  const { currentUser } = useAuth()

  const [comments, setComments] = useState()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setComments(null)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (error) {
      toast.error(error)
      setError(null)
    }
  }, [error])

  const createComment = async (data) => {
    const comment = {
      ...data,
      _id: nanoid(),
      pageId: userId,
      created_at: Date.now(),
      userId: currentUser._id
    }
    try {
      const { content } = await commentService.createComment(comment)
      console.log('content:', content)
    } catch (error) {
      errorCatcher(error, setError)
    }
  }

  return (
    <CommentsContext.Provider value={{ comments, createComment, isLoading }}>
      {children}
    </CommentsContext.Provider>
  )
}

CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export { useComments, CommentsProvider }
