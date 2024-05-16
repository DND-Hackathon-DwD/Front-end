import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

function App() {
  return (
    <main className="h-dvh flex overflow-hidden relative">
      <RouterProvider router={router} />
    </main>
  )
}

export default App
