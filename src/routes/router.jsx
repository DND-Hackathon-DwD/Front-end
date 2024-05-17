import { createBrowserRouter } from 'react-router-dom'
import { PATH } from './constants'

import { MainPage, SignUpPage, LoginPage } from '@/pages'

const router = createBrowserRouter([
  {
    path: PATH.MAIN,
    element: <MainPage />,
  },
  {
    path: PATH.SIGNUP,
    element: <SignUpPage />,
  },
  {
    path: PATH.LOGIN,
    element: <LoginPage />,
  },
])

export default router
