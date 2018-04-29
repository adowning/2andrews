import axios from 'axios'
const token = localStorage.getItem('humanityToken')
const BASE_URL = 'https://www.humanity.com/api/v2/'

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: false
})
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    //eslint-disable-next-line
    /* global window Store */
    config.headers.common['Access-Control-Allow-Origin'] = '*'

    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => response,
  error => {
    console.log(error.config)
    return Promise.reject(error)
  }
)
export function handler(event, context, callback) {
  instance.get('employees/' + event.queryStringParameters.id + token).then(response => {
    var cache = []
    var x = JSON.stringify(response.data.data, function (key, value) {

      if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
          // Circular reference found, discard key
          return
        }
        // Store value in our collection
        cache.push(value)
      }
      return value
    })
    cache = null // Enable garbage collection
    callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: x,
    })
  })
}
