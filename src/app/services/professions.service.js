import { httpService } from './http.service'

const professionsEndpoint = 'profession/'

const professionsService = {
  get: async () => {
    const { data } = await httpService.get(professionsEndpoint)
    return data
  }
}

export default professionsService
