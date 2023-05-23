import { httpService } from './http.service'

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
  getById: async (id) => {
    const { data } = await httpService.get(usersEndpoint + id)
    return data
  }
}

export default usersService
