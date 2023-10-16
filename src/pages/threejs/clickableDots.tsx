import { useState } from 'react';
// import Canvas2D from '../../components/ClickableDots/Canvas2D';
import { Canvas } from '@react-three/fiber';
import { Line, OrthographicCamera, Sphere } from '@react-three/drei';
import { Vector3 } from 'three';

class vector3Coordinates {
  x: number = 0;
  y: number = 0;
  z: number = 0;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

const ClickableDots = () => {

  const coordinates: number[][] = [[0, 0, 0],
  [0, 100, 0],
  [0, -100, 0],
  [100, 0, 0],
  [-100, 0, 0],
  ];

  // const coordinates: vector3Coordinates[] = [new vector3Coordinates(0, 0, 0),
  // new vector3Coordinates(0, 100, 0),
  // new vector3Coordinates(0, -100, 0),
  // new vector3Coordinates(100, 0, 0),
  // new vector3Coordinates(-100, 0, 0),
  // ];

  const [dots, setDots] = useState(coordinates.map((coordinate: number[]) => new vector3Coordinates(coordinate[0], coordinate[1], coordinate[2])));
  // const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState([]);
  const [isMouseDown, setIsMouseDown] = useState(false);

  // const normalizeCoordinateInit = (windowSize : number)=>{return (point : number)=>(point/windowSize)*2-1};
  // const toWidthNormalizedPoint = normalizeCoordinateInit(1920)
  // const toHeightNormalizedPoint = normalizeCoordinateInit(657)

  // const zOffset : number = 2;

  // const toWidthNormalizedPoint = (point : number)=>(point/window.innerWidth)*2-1
  // const toHeightNormalizedPoint = (point : number)=>-(point/window.outerHeight)*2+1

  // const handleMouseClick = (event: any) => {
  //   // const [x, y] = [toWidthNormalizedPoint(event.clientX), toHeightNormalizedPoint(event.clientY)];
  //   const [x, y] = [event.clientX-(window.outerWidth/2), -(event.clientY-(window.outerHeight/2))];
  //   console.log("Clicked", [x,y, event.clientX, event.clientY, window.outerWidth, window.outerHeight]);
  //   // console.log(window);


  //   // (point / window.width) * 2 -1
  //   // (0 / 500)*2 -1   = 0   * 2 - 1 = 0 - 1 = -1
  //   // (250 / 500)*2 -1 = 0.5 * 2 - 1 = 1 - 1 = 0
  //   // (500 / 500)*2 -1 = 1   * 2 - 1 = 2 - 1 = 1

  //   // 0=-1
  //   // 250=0
  //   // 500=1


  //   setDots((prevDots) => [...prevDots, { x, y }]);
  // };



  const handleMouseDown = (event: any) => {
    console.log(event.clientX, event.clientY, event.target);
    const [x, y] = [event.clientX - (window.innerWidth / 2), -(event.clientY - (window.innerHeight / 2))];
    // setDots((prevDots) => [...prevDots, { x, y }]);
    setIsMouseDown(true);
    setCurrentLine((prevLine) => [...prevLine, [x, y]]);
  }

  const handleMouseUp = (event: any) => {
    setIsMouseDown(false);
  }

  return (
    <Canvas onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
      <ambientLight intensity={0.5} />
      <OrthographicCamera makeDefault
        // zoom={1}
        top={200}
        bottom={-200}
        left={200}
        right={-200}
        near={0.1}
        far={2000}
        position={[0, 0, 200]} />
      {/* <Sphere args={[10, 16, 16]} position={new Vector3(0,-362,0)}>
          <meshBasicMaterial attach="material" color="red" />
        </Sphere>

        <Sphere args={[10, 16, 16]} position={new Vector3(-770,0,0)}>
          <meshBasicMaterial attach="material" color="red" />
        </Sphere> */}
      {/* <Line points={[[-100, 0, 0], [0, 100, 0], [100, 0, 0]]} lineWidth={5} /> */}
      <Line points={[[-100, 0, 0], [0, 100, 0], [100, 0, 0]]} lineWidth={5} />

      {
        isMouseDown &&
        <Line points={[[-200, 0, 0], [0, 200, 0]]} lineWidth={5} />
      }

      {dots.map((dot: vector3Coordinates, index: number) => (
        <Sphere key={index} args={[10, 16, 16]} position={new Vector3(dot.x, dot.y, dot.z)}>
          <meshBasicMaterial attach="material" color="red" />
        </Sphere>
      ))}
    </Canvas>
  );

};

export default ClickableDots;