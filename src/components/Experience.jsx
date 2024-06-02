import React from 'react'
import { Environment, OrbitControls,GizmoHelper, GizmoViewport } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import BakedModel from './BakedModel.jsx'

const Experience = () => {

    let time =0

    useFrame((state, delta) =>{
            const elapsedTime = state.clock.elapsedTime
            console.log(time+elapsedTime)

        })

    return (
        <>

            <OrbitControls makeDefault />

            {/* Sets background */}
            <color args={['#000000']} attach='background' />

            {/* Sets lighting env map */}
            {/* We probs dont need this because the model has lights baked and out shaders are probs mesh basic */}
            <Environment
                // background
                preset="sunset"
            />

            <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                <GizmoViewport axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']} labelColor="white" />
            </GizmoHelper>

            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={'pink'} />

                {/* <Helper type={BoxHelper} args={['royalblue']} />
                    <Helper type={VertexNormalsHelper} args={[1, 0xff0000]} /> */}
            </mesh>

            <BakedModel />



        </>
    )
}

export default Experience