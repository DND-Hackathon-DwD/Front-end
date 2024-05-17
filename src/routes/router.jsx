import { createBrowserRouter } from 'react-router-dom'
import { PATH } from './constants'

import {
  MainPage,
  SignUpPage,
  LoginPage,
  PostingPage,
  ContentsListPage,
  ContentsPage,
  HistoryPage,
  MyPage,
  LandingPage,
} from '@/pages'
// import ContentsPage from '../pages/ContentsPage/[contentsId]'

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
  {
    path: PATH.POSTING,
    element: <PostingPage />,
  },
  {
    path: PATH.CONTENTSLIST,
    element: <ContentsListPage />,
  },
  {
    path: PATH.CONTENTS,
    element: <ContentsPage />,
  },
  {
    path: PATH.HISTORY,
    element: <HistoryPage />,
  },
  {
    path: PATH.MYPAGE,
    element: <MyPage />,
  },
  {
    path: PATH.LANDING,
    element: <LandingPage />,
  },
])

export default router
