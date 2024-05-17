import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import UserContextProvider from './context/userContext'
import AuthGuard from './components/authGuard'

function App() {
  return (
    <main className="h-dvh flex overflow-hidden relative">
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </main >
  )
}

export default App
