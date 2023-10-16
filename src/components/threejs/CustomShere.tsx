import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { angleToRadian } from "../../helpers/func"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

const CustomShere = () => {
  const orbitControlRef = useRef(null);

  // useFrame((state) => {
  //   if(!(!orbitControlRef.current)){
  //     const {x, y} = state.mouse;
  //     // console.log(orbitControlRef.current);
  //     orbitControlRef.current.setAzimuthalAngle(x*angleToRadian(60));
  //     // orbitControlRef.current.update();

  //     orbitControlRef.current.setPolarAngle((y + 1 )*angleToRadian(60));
  //     orbitControlRef.current.update();

  //   }
  // })
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1, 5]} />
      <OrbitControls ref={orbitControlRef} minPolarAngle={angleToRadian(30)} maxPolarAngle={angleToRadian(89)}/>
      {/* Sphere */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh rotation={[-angleToRadian(90), 0, 0]}>
        <planeGeometry args={[7, 7]} />
        <meshStandardMaterial color="#1ea3d8" />
      </mesh>
    </>

  )
}

export default CustomShere