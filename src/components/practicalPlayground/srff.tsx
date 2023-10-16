// import { useRef, useState } from 'react';
// import { Canvas, useFrame } from 'react-three-fiber';
// import { Line } from '@react-three/drei';

function Srff() {
//   const [points, setPoints] = useState([]);
//   const lineRef = useRef();

//   const addPoint = (event) => {
//     const { clientX, clientY } = event;
//     const x = (clientX / window.innerWidth) * 2 - 1;
//     const y = -(clientY / window.innerHeight) * 2 + 1;

//     setPoints([...points, [x, y]]);
//   };

//   useFrame(() => {
//     if (points.length === 2) {
//       const [point1, point2] = points;
//       lineRef.current.setPoints([point1[0], point1[1], 0, point2[0], point2[1], 0]);
//     }
//   });

  return (
    <div>SRFF</div>
    // <Canvas
    //   onClick={(event) => {
    //     if (points.length < 2) {
    //       addPoint(event);
    //     }
    //   }}
    // >
    //   <Line ref={lineRef} color="blue" lineWidth={10} points={[]} />
    // </Canvas>
  );
}

export default Srff;
