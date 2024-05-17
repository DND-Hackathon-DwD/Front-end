import axios from 'axios';
import { USER } from './endpoint'

export const getMe = async () => {
  const apiUrl = process.env.VITE_REACT_API_URL;
  const config = {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  }
  return await axios.get(`${apiUrl}/${USER}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  })
}

export default getMe

