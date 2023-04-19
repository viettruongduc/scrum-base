import { instance as axiosClient } from '../network'

const axiosService = {

  getAll(params, url) {
    return axiosClient.get(url, { params })
  },

  getById(id, url) {
    const base_url = `${url}${id}`
    return axiosClient.get(base_url)
  },


  post(data, url) {
    const base_url = `${url}`
    return axiosClient.post(base_url, data)
  },

  put(data, url) {
    const base_url = `${url}`
    return axiosClient.put(base_url, data)
  },

  update(data, url) {
    const base_url = `${url}`
    return axiosClient.patch(base_url, data)
  },

}

export default axiosService
