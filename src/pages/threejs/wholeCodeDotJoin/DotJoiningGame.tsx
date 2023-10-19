import { OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import DotJoiningGameComp from "./DotJoinintGameComp";

const DotJoiningGame = () => {

    return (
        <Canvas gl={{ antialias: true }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[1, 1, 1]} intensity={0.5} />
            <OrthographicCamera makeDefault
                // zoom={1}
                top={200}
                bottom={-200}
                left={200}
                right={-200}
                near={0.1}
                far={2000}
                position={[0, 0, 200]} />

            <DotJoiningGameComp />

        </Canvas>
    )
}

export default DotJoiningGame