import { useLoader } from "@react-three/fiber";
import { TextureLoader, Vector3 } from "three";
import img from './../../../assets/mono_logo.jpg';

function HighlightedSqaure({ position = new Vector3(0.5, 0.5, 0) }: { position?: Vector3 }) {
  const planeSize = 1;
  const MeshPosition = position;
  const imgTexture = useLoader(TextureLoader, img);
  return (
    <>
      <mesh position={MeshPosition}>
        <planeGeometry args={[planeSize, planeSize, planeSize]} />
        <meshBasicMaterial color={'white'} map={imgTexture}/>
      </mesh>
    </>
  );
}

export default HighlightedSqaure;