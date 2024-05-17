import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://3.35.121.67:8080/',
})

export default instance
