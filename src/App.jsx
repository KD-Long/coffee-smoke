
import './App.css'
import { Canvas } from '@react-three/fiber'

import Experience from './components/Experience'


function App() {


  return (
    <>
      <Canvas
        shadows={true}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [9, 10, 12]
        }}
      >
        <Experience />
      </Canvas>
    </>
  )
}

export default App
