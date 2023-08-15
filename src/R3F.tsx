import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { useRef } from "react";
import { Mesh, Vector3 } from "three";

function Cube() {
  const cubeRef = useRef<Mesh | null>(null);
  // useFrame is a hook that allows us to have a render-loop inside of a functional component
  useFrame(() => {
    // Rotate mesh every frame, this is outside of React without overhead
    if (!cubeRef.current) return;

    cubeRef.current.rotation.x += 0.01;
    cubeRef.current.rotation.y += 0.01;
  });

  return (
    <mesh
      position={[0, 0, 0]}
      ref={cubeRef} // This reference allows us to rotate the mesh
    >
      <boxGeometry attach="geometry" args={[2, 2, 2]} />
      <meshBasicMaterial attach="material" color="purple" />
    </mesh>
  );
}

function Sphere() {
  return (
    <mesh position={[-1, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshBasicMaterial attach="material" />
    </mesh>
  );
}

export default function R3F() {
  return (
    <Canvas gl={{ antialias: true, alpha: true }}>
      {/* Camera and scene are created in the canvas, so we don't need to worry about it, just if we want it to */}
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight />
      <pointLight position={[10, 0, 0]} />
      <pointLight position={new Vector3(0, 0, 0)} />
      <Cube />
      {/* <Sphere /> */}
    </Canvas>
  );
}
