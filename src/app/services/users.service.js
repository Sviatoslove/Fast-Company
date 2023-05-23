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
  }
}

export default usersService
