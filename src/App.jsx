import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

function App() {
  return (
    <main className="h-dvh flex relative">
      <div className="mobileContainer">
        <RouterProvider router={router} />
      </div>
    </main>
  )
}

export default App
