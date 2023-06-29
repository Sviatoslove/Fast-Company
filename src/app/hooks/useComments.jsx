import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { errorCatcher } from '../utils'
import { toast } from 'react-toastify'
import commentService from '../services/comment.service'
import { useSelector } from 'react-redux'
import { selectUserId } from '../store/users'

const CommentsContext = React.createContext()

const useComments = () => useContext(CommentsContext)

const CommentsProvider = ({ children }) => {
  const { userId } = useParams()
  const currentUserId = useSelector(selectUserId())

  const [comments, setComments] = useState()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getComments()
  }, [userId])

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
      userId: currentUserId
    }
    try {
      const { content } = await commentService.createComment(comment)
      setComments((prevState) => [...prevState, content])
    } catch (error) {
      errorCatcher(error, setError)
    }
  }

  const getComments = async () => {
    try {
      const { content } = await commentService.getComments(userId)
      setComments(content)
      return content
    } catch (error) {
      errorCatcher(error, setError)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteComment = async (id) => {
    try {
      const { content } = await commentService.deleteComment(id)
      if (content === null) {
        setComments((prevState) =>
          prevState.filter((comment) => comment._id !== id)
        )
      }
      return content
    } catch (error) {
      errorCatcher(error, setError)
    }
  }

  return (
    <CommentsContext.Provider
      value={{ comments, createComment, isLoading, deleteComment }}
    >
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
