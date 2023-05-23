import axios from 'axios'
import { toast } from 'react-toastify'
import configFile from '../config.json'

const { isFireBase, apiEndpointFireBase, apiEndpointMongoDb } = configFile

//создание instance или экземпляра axios с необходимой конфигурацией
const http = axios.create({
  baseURL: isFireBase ? apiEndpointFireBase : apiEndpointMongoDb
})

//изменение стандартной конфигурации axios
//axios.defaults.baseURL = isFireBase ? apiEndpointFireBase : apiEndpointMongoDb

http.interceptors.request.use(
  function (config) {
    if (configFile.isFireBase) {
      const containSlash = /\/$/gi.test(config.url)
      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + '.json'
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

function transformData(data) {
  return data
    ? Object.keys(data).map((key) => ({
        ...data[key]
      }))
    : []
}

http.interceptors.response.use(
  (res) => {
    if (configFile.isFireBase) res.data = { content: transformData(res.data) }
    return res
  },
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500
    if (!expectedErrors) {
      console.log(error)
      toast.error('Something was wrong. Try later.')
    }
    return Promise.reject(error)
  }
)

export const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete
}
