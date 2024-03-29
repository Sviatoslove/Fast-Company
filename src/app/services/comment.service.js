import { httpService } from './http.service'

const commentEndpoint = 'comment/'

const commentService = {
  createComment: async (payload) => {
    const { data } = await httpService.put(
      commentEndpoint + payload._id,
      payload
    )
    return data
  },
  getComment: async (pageId) => {
    const { data } = await httpService.get(commentEndpoint, {
      params: {
        orderBy: '"pageId"',
        equalTo: `"${pageId}"`
      }
    })
    return data
  },
  deleteComment: async (id) => {
    const { data } = await httpService.delete(commentEndpoint + id)
    return data
  }
}

export default commentService
