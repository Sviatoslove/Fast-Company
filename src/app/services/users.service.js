import { httpService } from './http.service'
import { getUserId } from './localStorage.service'

const usersEndpoint = 'user/'

const usersService = {
  get: async () => {
    const { data } = await httpService.get(usersEndpoint)
    return data
  },
  create: async (user) => {
    const { data } = await httpService.put(usersEndpoint + user._id, user)
    return data
  },
  getCurrentUser: async () => {
    const { data } = await httpService.get(usersEndpoint + getUserId())
    return data
  },
  update: async (user) => {
    const { data } = await httpService.patch(usersEndpoint + getUserId(), user)
    return data
  }
}

export default usersService
