import { DoubleSide } from "three";
import { angleToRadian } from "../../../helpers/func";

const BasePlane = () => {
   const planeSize = 20;
   const gridHelperSize = planeSize; 
   const gridHelperDimensions = planeSize;
    return (
        <>
           <mesh>
            <planeGeometry args={[planeSize,planeSize]} />
            <meshBasicMaterial side={DoubleSide}/>
           </mesh>
           <gridHelper args={[gridHelperSize, gridHelperDimensions]} rotation-x={angleToRadian(90)} />
        </>
    )
}

export default BasePlane