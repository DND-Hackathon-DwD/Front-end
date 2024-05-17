import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import UserContextProvider from './context/userContext'
import {
  DDip,
} from '@/assets/Icons'
import { useState } from 'react';

function App() {
  const [circles, setCircles] = useState([]);

  const handleCanvasClick = (event) => {
    const x = event.clientX;
    const y = event.clientY;

    // 새로운 동그라미와 각도를 추가합니다.
    setCircles([...circles, { x, y }]);

    // 0.5초 후에 동그라미를 제거합니다.
    setTimeout(() => {
      setCircles(circles.filter((circle) => circle.x !== x || circle.y !== y));
    }, 270);
  };

  return (
    <main className="h-dvh flex overflow-hidden relative" onClick={handleCanvasClick}>
      {circles.map((circle, index) => (
        <div
          key={index}
          style={{
            zIndex: 100,
            position: 'absolute',
            left: circle.x - 10,
            top: circle.y - 10,
            objectFit: 'contain',
            transform: `rotate(${index.rotation * 40}deg)`
          }} >
          <DDip />
        </div>))}
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </main>
  )
}

export default App
