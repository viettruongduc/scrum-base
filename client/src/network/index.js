import axios from 'axios'

const BASE_URL = 'http://localhost:4000'

/*
  Axios config
*/

export let instance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site'
    // 'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  },
})


// Request interceptor
instance.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

// Response interceptor
instance.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    let customError = {
      message: error?.message,
      status: error?.response?.status,
      error,
    }

    return Promise.reject(customError)
  },
)
