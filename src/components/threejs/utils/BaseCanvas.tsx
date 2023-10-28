import { Canvas } from "@react-three/fiber"
import BaseSetting from "./BaseSetting"

interface BaseCanvasProps {
    children?: React.ReactNode;
}

const BaseCanvas = ({ children }: BaseCanvasProps) => {
    return (
        <>
            <Canvas gl={{ antialias: true }}
                style={{ width: "100vw", height: "100vh" }} // Set the initial size of the canvas
            >
                {children}
                <BaseSetting />
            </Canvas>
        </>
    )
}

export default BaseCanvas