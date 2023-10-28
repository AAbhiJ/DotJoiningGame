import { Vector3 } from "three";
import EXORGate from "../threejs/utils/Gates/EXORGate"

interface FlipFlopGateInterface {
    position: Vector3,
    id: number
}

const FlipFlopComps = () => {

    const EXORGatePositions: FlipFlopGateInterface[] = [
        { position: new Vector3(4, 2, 0), id: 1 },
        { position: new Vector3(4, -2, 0), id: 2 },
        { position: new Vector3(-4, 3, 0), id: 3 },
        { position: new Vector3(-4, -3, 0), id: 4 },
    ];

    // const handleGrpClick = (e : THREE.Event)=>{
    //     let l = e;
    // }


    // const curPoints1 : [number, number, number] = [-2.25, 3, 0];
    // const curPoints2 : [number, number, number] = [2.25, 2.5499999970197678, 0];
    return (
        <>
           
                {
                    EXORGatePositions.map((flipFlopGate, index) =>
                        <EXORGate meshPosition={flipFlopGate.position} id={flipFlopGate.id} key={index} />
                    )
                }
                {/* <Line points={[curPoints1, curPoints2]} color={"#378805"} lineWidth={3} /> */}
           
        </>
    )
}

export default FlipFlopComps