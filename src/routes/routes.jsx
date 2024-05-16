import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/home/Home'
import Posting from '../pages/posting/Posting'
import Contents from '../pages/[contentsId]/Contents'
import ContentsList from '../pages/contentsList/ContentsList'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/posting',
    element: <Posting />,
  },
  {
    path: '/contents-list',
    element: <ContentsList />,
  },
  {
    path: '/:id',
    element: <Contents />,
  },
])

export default router
