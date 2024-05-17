import { createContext, useEffect, useMemo, useState } from 'react';
import { getMe } from '../apis/user';
import axios from 'axios';

export const UserContext = createContext({
  init: false,
  user: null,
  setUser: () => null,
  login: () => null,
  logout: () => null,
});

function UserContextProvider({ children }) {
  // const [init, setInit] = useState(false);
  const [user, setUser] = useState(null);

  function logout() {
    setUser(null);
  }

  async function login(userId, passwd) {
    try {
      console.log('login')
      const apiUrl = import.meta.env.VITE_REACT_API_URL
      const response = await axios.post(`${apiUrl}/user/login`, { "user_id": userId, "password": passwd });
      console.log(response)
      const responseJson = response.data
      // const responseJson = await response.json()
      localStorage.setItem('token', responseJson.data.access_token);
      localStorage.setItem('refresh_token', responseJson.data.refresh_token);
      setUser(responseJson.data)
      // setInit(true)
    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    // console.log('usercontext')
    (async () => {
      try {
        const response = await getMe()

        setUser(response.data);
      } catch (error) {
        console.log(error)
      }
      // setInit(true);
    })();
  }, []);

  const value = useMemo(() => ({ user, setUser, logout, login }), [user, setUser]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContextProvider