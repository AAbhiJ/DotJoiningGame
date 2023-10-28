import { Canvas } from "@react-three/fiber"
import { OrthographicCamera } from "@react-three/drei"
import GameBoard from "./components/GameBoard"
// import { OrbitControls } from "@react-three/drei"

const DragDropBoard = () => {

  return (
    <Canvas>
      {/* <OrbitControls /> */}
      <OrthographicCamera makeDefault zoom={30} position={[0, 0, 1]} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />

      <GameBoard />

      {/* <GameScene /> */}
    </Canvas>
  )
}

export default DragDropBoard