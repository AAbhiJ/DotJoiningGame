import { OrbitControls, OrthographicCamera } from '@react-three/drei'
import BasePlane from './BasePlane'

const BaseSetting = () => {
    return (
        <>
            <OrbitControls maxZoom={80} minZoom={30} enableRotate={false} />
            <OrthographicCamera makeDefault zoom={30} position={[0, 0, 50]} />
            <ambientLight intensity={0.5} />
            <BasePlane/>
        </>
    )
}

export default BaseSetting