import { RouterProvider } from 'react-router-dom'
import router from './routes/routes'

function App() {
  return (
    <main>
      <div className="mobileContainer">
        <RouterProvider router={router} />
      </div>
    </main>
  )
}

export default App
