import { Line } from "@react-three/drei"
import { Vector3 } from "three";

const ConnectionLines = () => {
    
    // {
    //     "x": -2.25,
    //     "y": 3,
    //     "z": 0
    // }

    // {
    //     "x": 2.25,
    //     "y": 2.5499999970197678,
    //     "z": 0
    // }

    const curPoints1 : Vector3 = new Vector3(-2.25, 3, 0);
    const curPoints2 : Vector3 = new Vector3(2.25, 2.5499999970197678, 0);
console.log({curPoints1})
    return (
        <>
           <Line points={[curPoints1, curPoints2]} color={"#378805"} lineWidth={3} />
        </>
    )
}

export default ConnectionLines