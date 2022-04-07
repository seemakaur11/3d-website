import { useFrame } from "@react-three/fiber";
import React from "react";
import { useRef } from "react";

// box geometry
export const Box = () => {
    const mesh = useRef();
    console.log('mesh ====>', mesh)
    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))
    return (
        <mesh ref={mesh} position={[10, -1, 1]}>
            <boxGeometry args={[2, 2, 2]} />
            <meshBasicMaterial color={'green'} />
        </mesh>
    )
}
export const Ball = () => {
    return (
        <mesh position={[5, -2, -10]}>
            <sphereGeometry args={[2, 128, 128]} />
            <meshBasicMaterial color={'hotpink'} />
        </mesh>
    )
}
// torus geomtery
const TorusShaderMaterial = {
    uniforms: {
        u_time: { type: "f", value: 0 }
    },
    vertexShader: `
      precision mediump float;
      varying vec2 vUv;
      void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.);
          gl_Position = projectionMatrix * mvPosition;
          vUv = uv;
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform float u_time;
      void main() {
        vec2 uv = vUv;
        float cb = floor((uv.x + u_time) * 40.);
        gl_FragColor = vec4(mod(cb, 2.0),0.,0.,1.);
      }
    `
};
export const TorusGeometry = () => {
    const mesh = useRef();
    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))
    return (
        <mesh ref={mesh}>
            <torusGeometry args={[1.8, 1.2, 48, 64]} />
            <shaderMaterial attach="material" args={[TorusShaderMaterial]} color={"green"} />
        </mesh>
    )
}
