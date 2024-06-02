import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';


// import vertexShader from '../shaders/vertexShader.glsl';
// import fragmentShader from '../shaders/fragmentShader.glsl';


const Smoke = () => {
    // so every time it loads (when i save it doesnt keep scaling)
    const [scaleFlag, setScaleFlag] = useState(0)
    const smokeMeshRef = useRef()


    const MyShaderMaterial = shaderMaterial({
        // uTime: 0,
        // uColorStart: new THREE.Color('#00082e'),
        // uColorEnd: new THREE.Color('#d1fbff')
    },
  // vertex shader
  /*glsl*/`
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
`,
// fragment shader
/*glsl*/`
        uniform float time;
        uniform vec3 color;
        varying vec2 vUv;
        void main() {
            gl_FragColor.rgba = vec4(0.5 + 0.3 * sin(vUv.yxx + time) + color, 1.0);
        }
`
    )
    //this exent allows it to be used a a component below
    // Note: When using "extend" which register custom components with the JSX reconciler, 
    // use lowercase names for those components, regardless of how they are initially defined.
    extend({ MyShaderMaterial: MyShaderMaterial })

    //once off on first render
    // scales Geo without scaling mesh
    useEffect(() => {
        if (!scaleFlag) {
            // shifts the object verticies upp making to origin on the bottom middle edge of the plane
            smokeMeshRef.current.geometry.translate(0, 0.5, 0)
            smokeMeshRef.current.geometry.scale(1.5, 6, 1.5)
            smokeMeshRef.current.position.set(0, 1.83, 0)
            setScaleFlag(1)
        }

    }, [])

    return (
        <>
            {/* Note Im scaling the mesh and not geometry here not sure if this wil lcause an issue later */}
            <mesh ref={smokeMeshRef} >
                <planeGeometry args={[1, 1, 16, 64]} />
                <myShaderMaterial />
            </mesh>
        </>
    )
}


export default Smoke