import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { shaderMaterial, useTexture } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';

import vertexShader from '../shaders/vertexShader.glsl';
import fragmentShader from '../shaders/fragmentShader.glsl';


const Smoke = () => {
    // so every time it loads (when i save it doesnt keep scaling)
    const [scaleFlag, setScaleFlag] = useState(0)
    const smokeMeshRef = useRef()

    const perlin = useTexture('/perlin.png')
    perlin.wrapS = THREE.RepeatWrapping
    perlin.wrapT = THREE.RepeatWrapping
    // sets the texture to keep wrapping the edges


    const MyShaderMaterial = shaderMaterial({
        // uPerlinTexture: {value: perlin},
        uTime: 0,
        // uPerlinTexture: new THREE.Uniform(perlin),
        uPerlinTexture: perlin,
    },
        vertexShader,
        fragmentShader
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

    useFrame((state, delta) => {

        const elapsedTime = state.clock.elapsedTime
        smokeMeshRef.current.material.uniforms.uTime.value += delta
        
        state.camera.lookAt(0, 3, 0);
    })

    return (
        <>
            {/* Note Im scaling the mesh and not geometry here not sure if this wil lcause an issue later */}
            <mesh ref={smokeMeshRef} >
                <planeGeometry args={[1, 1, 16, 64]} />
                <myShaderMaterial side={THREE.DoubleSide} transparent depthWrite={false} />
            </mesh>
            
        </>
    )
}


export default Smoke