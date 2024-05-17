import { UserContext } from '../context/userContext';

import { useContext, useEffect, useState } from 'react';
// import { useNavigate } from "react-router-dom";


export default function AuthGuard({
  children,
  withRedirect = true,
}) {
  const { user, init } = useContext(UserContext);
  const [show, setShow] = useState(false);
  // const navigate = useNavigate();
  const params = window.location.pathname;

  console.log('user')
  console.log(user)

  useEffect(() => {
    console.log('authguard')
    console.log(init, user, params, withRedirect)
    // if (!init) {
    //   return
    // }

    if (user != null) {
      console.log(user, 'user is not null')
      setShow(true)
    }

    if (params === '/login') {
      setShow(true)
    }

    if (withRedirect && user == null) {
      // redirect('/login')
      // navigate('/login')
      console.log('login이동')
      // location.href = '/login'
    }
  }, [user, params]);

  return show ? <> {children}</> : null;
}