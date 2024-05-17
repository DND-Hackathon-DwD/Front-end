import axios from 'axios';
import { USER } from './endpoint'

export const getMe = async () => {
  const token = localStorage.getItem('token')
  console.log(token, USER)
  return await axios.get(`${USER}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
}

export default getMe

