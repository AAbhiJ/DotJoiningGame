import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import CustomScene from "./../../components/threejs/CustomScene";
// import Canvas2D from '../../components/threejs/Canvas2D';
import { Canvas } from '@react-three/fiber';

const Threejs = () => {
  
  return (
    <div className='game-container'>
      <Canvas id="three-canvas">
        <Suspense fallback={null}>
          <CustomScene></CustomScene>
        </Suspense>
      </Canvas>
        {/* <CustomScene /> */}
        {/* Add other components or elements as needed */}
      <Link to={"/"}>Go to Dashboard Page</Link>
    </div>
  );
};

export default Threejs;
