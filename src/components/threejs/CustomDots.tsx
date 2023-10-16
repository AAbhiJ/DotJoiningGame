import { Line, PerspectiveCamera, Sphere } from "@react-three/drei";
import { useState } from "react";
import { Vector3 } from "three";

const Dot = ({ position }: { position: [number, number, number] }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial color={0xff0000} />
    </mesh>
  );
};

const LineMesh = () => {
  return (
    <>
      <Line points={[[-1, 0, 0], [0, 1, 0], [1, 0, 0]]} lineWidth={5} />
      <Sphere key={0} args={[0.1, 16, 16]} position={new Vector3(0, 0, 0)} >
        <meshBasicMaterial attach="material" color="red" />
      </Sphere>
    </>
    // <mesh position={position}>
    //   <lineSegments geometry={}/>
    //   <meshStandardMaterial color={0xff0000} />
    // </mesh>
  );
};

const ClickableDot = () => {

  const [dots, setDots] = useState([]);

  const handleMouseClick = (event: any) => {
    const { x, y, z } = event.point;
    setDots((prevDots) => [...prevDots, { x, y, z }]);
  };

  return (
    <>
      {dots.map((dot, index) => (
        <Sphere key={index} args={[0.1, 16, 16]} position={new Vector3(dot.x, dot.y, dot.z)}>
          <meshBasicMaterial attach="material" color="red" />
        </Sphere>
      ))}
    </>
  )
}

const CustomDots = () => {
  // const generateRandomDots = (count: number) => {
  //   const dots = [];
  //   for (let i = 0; i < count; i++) {
  //     const x = Math.random() * 10 - 5; // Adjust the range as needed
  //     const y = Math.random() * 10 - 5;
  //     const z = 0;
  //     dots.push({ x, y, z });
  //   }
  //   return dots;
  // };

  // const dots = generateRandomDots(5);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1, 5]} />
      {/* <ClickableDot /> */}
      {/* <LineMesh /> */}
      {/* {dots.map((dot, index) => (
          <Dot key={index} position={[dot.x, dot.y, dot.z]} />
        ))} */}

      {/* Light */}
      {/* <ambientLight args={["#ffffff", 1]} /> */}

    </>
  )
}

export default CustomDots