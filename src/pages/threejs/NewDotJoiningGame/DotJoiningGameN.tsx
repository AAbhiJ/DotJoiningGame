import { Canvas } from "@react-three/fiber"
// import img from './../../../assets/mono_logo.jpg';
import { MouseEvent } from "react";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import ThreeDotsWLineCrossJoiningV2 from "./components/ThreeDotsWLineCrossJoiningV2";
// import { useEffect, useState } from "react";


const DotJoiningGameN = () => {
  // const calculateCanvasSize = (parentWidth : number, parentHeight : number, aspectRatio : number) => {
  //   const canvasWidth = Math.min(parentWidth, parentHeight * aspectRatio);
  //   const canvasHeight = Math.min(parentHeight, canvasWidth / aspectRatio);
  //   return { canvasWidth, canvasHeight };
  // };

  // const [imgPlaneSize, setImgPlaneSize] = useState<[number, number]>([0,0])

  // const imagePlaneSize = 10;
  // useEffect(() => {
  //   const imgN = new Image();
  //   imgN.src = img;
  //   console.log({ img, w: imgN.clientWidth, h: imgN.height, imgN });
  // })

  const handleClick = (e: MouseEvent) => {
    console.log(e);
  }
  return (
    <Canvas gl={{ antialias: true }}
      onClick={(e) => handleClick(e)}
      style={{ width: '100vw', height: '100vh' }} // Set the initial size of the canvas
    >

      <OrbitControls maxZoom={80} minZoom={30} enableRotate={false} />
      <OrthographicCamera makeDefault zoom={30} position={[0, 0, 50]} />
      <ambientLight intensity={0.5} />

      {/* Actial Objects */}
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