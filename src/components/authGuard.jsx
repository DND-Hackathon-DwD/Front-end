export { UserContext, UserContextProvider };

import { UserContext } from '@/contexts/user_context';
import { useContext, useEffect, useState } from 'react';
import { redirect, usePathname } from "react-router-dom";


export default function AuthGuard({
  children,
  withRedirect = true,
}) {
  const { user, init } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const params = usePathname();

  useEffect(() => {
    if (!init) {
      return
    }

    if (user != null) {
      setShow(true)
    }

    if (params === '/login') {
      setShow(true)
    }

    if (withRedirect && user == null) {
      redirect('/login')
    }
  }, [user, params, withRedirect, init]);

  return show ? <> {children}</> : null;
}