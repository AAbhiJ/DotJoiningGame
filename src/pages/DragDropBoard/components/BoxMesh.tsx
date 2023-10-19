import {Vector3 } from "three";

function BoxMesh({position = new Vector3(0,0,0)} : {position ?: Vector3}) {
  const boxSize = 1;
  return (
    <>
      <mesh position={position}>
        <boxGeometry args={[boxSize,boxSize,boxSize]}/>
        <meshBasicMaterial color={'blue'}/>
      </mesh>
    </>
  );
}

export default BoxMesh;