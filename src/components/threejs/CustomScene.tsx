// import Canvas2D from "./Canvas2D"

// import { Box } from "@react-three/drei"
import CustomDots from "./CustomDots"
// import CustomShere from "./CustomShere"
// import CustomTeaching from "./CustomTeaching"



const CustomScene = () => {
  return (
    <>
      {/* <ambientLight />
      <pointLight position={[10, 10, 10]} /> */}
      <CustomDots></CustomDots>


      {/* <ambientLight /> */}
      {/* <pointLight position={[10, 10, 10]} />
        <Box position={[0, 0, 0]} /> */}


      {/* <Canvas2D></Canvas2D> */}
      {/* <CustomShere></CustomShere> */}
      {/* Light */}
      <ambientLight args={["#ffffff", 1]} />

    </>
  )
}

export default CustomScene