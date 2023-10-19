import { OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber"
import ThreeDotsWLineCrossJoiningV2 from "./components/ThreeDotsWLineCrossJoiningV2";

const DotJoiningGameN = () => {
  // const calculateCanvasSize = (parentWidth : number, parentHeight : number, aspectRatio : number) => {
  //   const canvasWidth = Math.min(parentWidth, parentHeight * aspectRatio);
  //   const canvasHeight = Math.min(parentHeight, canvasWidth / aspectRatio);
  //   return { canvasWidth, canvasHeight };
  // };

  return (
    <Canvas gl={{ antialias: true }}
      style={{ width: '100vw', height: '100vh' }} // Set the initial size of the canvas
      camera={{ position: [0, 0, 50] }}
    >
      <OrthographicCamera makeDefault zoom={25} position={[0, 0, 50]} />
      <ambientLight intensity={0.5} />
      <group scale={[1, 1, 1]}>
        {/* Three Dots with Line join any two Dots on Canvas */}
        <ThreeDotsWLineCrossJoiningV2 />
        {/* <ThreeDotsWLineCrossJoining /> */}

        {/* Three Dots with Line join any two Dots on Canvas */}
        {/* <ThreeDotsWLineJoining/> */}


        {/* Three Dots with Line on Canvas */}
        {/* <ThreeDotsWLineSelection/> */}

        {/* Three Dots on Canvas */}
        {/* <ThreeDots /> */}

        {/* Simple Square and Dot */}
        {/* <SquareNDot /> */}
      </group>
    </Canvas>
  )
}

export default DotJoiningGameN;