
import './App.css'
import { Canvas } from '@react-three/fiber'

import Experience from './components/Experience'


function App() {


  return (
    <>
      <Canvas
        shadows={true}
        camera={{
          fov: 25,
          near: 0.1,
          far: 100,
          position: [10, 12, 14]
        }}
      >
        <Experience />
      </Canvas>
    </>
  )
}

export default App
