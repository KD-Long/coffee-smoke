/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.17 ./public/bakedModel.glb 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function BakedModel(props) {
  const { nodes, materials } = useGLTF('/bakedModel.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.baked.geometry} material={materials.baked} position={[0, 1.826, 0]} />
    </group>
  )
}

useGLTF.preload('/bakedModel.glb')
