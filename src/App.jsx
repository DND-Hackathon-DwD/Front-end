import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import UserContextProvider from './context/userContext'
import {
  DDip,
} from '@/assets/Icons'
import { useState } from 'react';

function App() {
  const [bubble, setbubble] = useState([]);

  const handleCanvasClick = (event) => {
    const x = event.clientX;
    const y = event.clientY;

    setbubble([...bubble, { x, y }]);

    // 0.5초 후에 동그라미를 제거합니다.
    setTimeout(() => {
      setbubble(bubble.filter((circle) => circle.x !== x || circle.y !== y));
    }, 270);
  };


  return (
    <main
      onClick={handleCanvasClick}
      className="h-dvh flex overflow-hidden relative">
      {bubble.map((b, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: b.x - 10,
            top: b.y - 10,
            width: '10px',
            height: '10px',
            objectFit: 'contain',
            zIndex: 100,
            transform: `rotate(${index * 50}deg)`,
          }}
        >
          <DDip />
        </div>))}
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </main >
  )
}

export default App
