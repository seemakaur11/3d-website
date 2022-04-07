import React, { useRef, useState } from 'react'
import * as THREE from 'three';
import { Canvas, useFrame } from "@react-three/fiber";
import { OrthographicCamera, Stars, Html, OrbitControls } from "@react-three/drei";
import { Ball, Box, TorusGeometry } from './Geomerty';
import img from '../image/ppp.jpg';

const numLine = 100;
const lines = new Array(numLine).fill();
const colors = ['#A2CCB6', '#FCEEB5', '#EE786E', '#EE786E']
function Fatline() {
  const material = useRef();
  const [color] = useState(() => colors[parseInt(colors.length * Math.random())])
  const [ratio] = useState(() => 0.5 + 0.5 * Math.random())
  const [width] = useState(() => Math.max(0.1, 0.3 * Math.random()))

  const [curve] = useState(() => {
    let pos = new THREE.Vector3(30 - 60 * Math.random(), -5, 10 - 20 * Math.random())
    const points = new Array(30).fill().map(() => pos.add(new THREE.Vector3(2 - Math.random() * 4, 4 - Math.random() * 2, 5 - Math.random() * 10)).clone())
    return new THREE.CatmullRomCurve3(points).getPoints(500)
  })

  return (
    <mesh>
      <planeGeometry attach="geometry" vertices={curve} />
      <meshBasicMaterial attach="material" ref={material} transparent depthTest={false} lineWidth={width} color={color} dashArray={0.1} dashRatio={ratio} />
    </mesh>
  )
}
function Scene() {
  let group = useRef()
  let theta = 0
  // Hook into the render loop and rotate the scene a bit
  useFrame(() => group.current.rotation.set(0, 5 * Math.sin(THREE.Math.degToRad((theta += 0.02))), 0))
  return (
    <group ref={group}>
      {lines.map((_, index) => (
        <Fatline key={index} />
      ))}
    </group>
  )
}

function Home() {

  return (
    <div style={{ height: "100vh", backgroundColor: 'black' }}>
      <Canvas camera={{ position: [10, -4, 20], fov: 45 }}>
        <Html center position={[-30, 10, -10]}>
          <h1 style={{ color: "blue" }}>Future is now</h1>
          <p style={{ color: "blue", fontSize: "19px", fontWeight: "500" }}>Web designer and developer</p>
          <img src={img} alt="image-about" width="250px" height="250px" style={{ borderRadius: "50%" }} />
          <button className='btn'>CLICK ME</button>
        </Html>
        <Box />
        <Ball />
        <TorusGeometry />
        <Stars />
        <Scene />
        <OrthographicCamera position={[2, 2, 2]} />
      </Canvas>
    </div >
  )
}

export default Home


// function Room() {
  // OrthographicCamera
  // ref = { CameraRef }
  // makeDefault = { false}
  // zoom = { 50}
  // position = { [10, 10, 10]}
  // left = {(frustumSize * aspect) / -2}
  // right = {(frustumSize * aspect) / 2}
  // top = { frustumSize / 2}
  // bottom = { frustumSize / -2}
  // far = { 1000}
  // near = { 0.1}
  //   />
  // </>

//   return (
//     <Canvas
//       style={{ height: "100vh", margin: "10px", backgroundColor: 'black' }}
//       camera={{ position: [10, 10, 10] }}>
//       <Html>
//         <div className="label">My Home</div>
//       </Html>
//       <directionalLight position={[5, 5, 5]} intensity={0.5} />
//       <Stars />
//       <SmallBox />
//       <Ball />
//       <Wall />
//       <Ground />
//       <ControlCamera />
//       <Top />
//     </Canvas>
//   )
