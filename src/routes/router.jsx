import { createBrowserRouter } from 'react-router-dom'
import { PATH } from './constants'

import { MainPage, SignUpPage } from '@/pages'

const router = createBrowserRouter([
  {
    path: PATH.MAIN,
    element: <MainPage />,
  },
  {
    path: PATH.SIGNUP,
    element: <SignUpPage />,
  },
])

export default router
