import {Vector3 } from "three";

function HighlightedSqaure({position = new Vector3(0.5,0.5,0)} : {position ?: Vector3}) {
  const planeSize = 1;
  const MeshPosition = position;
  return (
    <>
      <mesh position={MeshPosition}>
        <planeGeometry args={[planeSize, planeSize, planeSize]}/>
        <meshBasicMaterial color={'red'}/>
      </mesh>
    </>
  );
}

export default HighlightedSqaure;