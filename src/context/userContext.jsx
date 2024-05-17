import { createContext, useEffect, useMemo, useState } from 'react';
import { getMe } from '../apis/user';

const UserContext = createContext({
  init: false,
  user: null,
  setUser: () => null,
  login: () => null,
  logout: () => null,
});

function UserContextProvider({ children }) {
  const [init, setInit] = useState(false);
  const [user, setUser] = useState(null);

  function logout() {
    setUser(null);
  }

  async function login() {
    try {
      const response = await axios.post('', requestBody);
      const responseJson = await response.json()
      localStorage.setItem('token', responseJson.data.access_token);
      localStorage.setItem('refresh_token', responseJson.data.refresh_token);
      setUser(responseJson.data)
      setInit(true)
    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    (async () => {
      try {
        setUser(await getMe());
      } catch (error) {
        console.log(error)
      }
      setInit(true);
    })();
  }, []);

  const value = useMemo(() => ({ user, setUser, logout, init, login }), [user, setUser, init]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
