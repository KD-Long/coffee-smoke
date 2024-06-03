import React from 'react'
import { Environment, OrbitControls,GizmoHelper, GizmoViewport } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'


import BakedModel from './BakedModel.jsx'
import Smoke from './Smoke.jsx'

const Experience = () => {

    return (
        <>
            <OrbitControls makeDefault />

            {/* Sets background */}
            <color args={['#000000']} attach='background' />

            {/* Sets lighting env map */}
            {/* We probs dont need this because the model has lights baked and out shaders are probs mesh basic */}
            {/* <Environment
                // background
                preset="sunset"
            /> */}
            <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                <GizmoViewport axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']} labelColor="white" />
            </GizmoHelper>

            {/* Coffee MODEL */}
            <BakedModel />
            
            {/* Smoke Shader */}
            <Smoke />

        </>
    )
}

export default Experience