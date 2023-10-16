import { OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber"
import ThreeDotsWLineCrossJoining from "./components/ThreeDotsWLineCrossJoining";

const DotJoiningGameN = () => {
  return (
    <Canvas gl={{ antialias: true }}>
      <OrthographicCamera makeDefault zoom={25} position={[0, 0, 50]} />
      <ambientLight intensity={0.5} />

      {/* Three Dots with Line join any two Dots on Canvas */}
      <ThreeDotsWLineCrossJoining/>

      {/* Three Dots with Line join any two Dots on Canvas */}
      {/* <ThreeDotsWLineJoining/> */}


      {/* Three Dots with Line on Canvas */}
      {/* <ThreeDotsWLineSelection/> */}

      {/* Three Dots on Canvas */}
      {/* <ThreeDots /> */}

      {/* Simple Square and Dot */}
      {/* <SquareNDot /> */}

    </Canvas>
  )
}

export default DotJoiningGameN;