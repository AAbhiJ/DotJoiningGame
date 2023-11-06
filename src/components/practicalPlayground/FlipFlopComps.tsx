import { Vector3 } from "three";
import EXORGate from "../threejs/utils/Gates/EXORGate"
import SwitchButton from "../threejs/utils/Gates/SwitchButton";

interface CanvasPositionsInterface {
    position: Vector3,
    id: number
}


const FlipFlopComps = () => {

    const EXORGatePositions: CanvasPositionsInterface[] = [
        { position: new Vector3(4, 2, 0), id: 1 },
        { position: new Vector3(4, -2, 0), id: 2 },
        { position: new Vector3(-4, 3, 0), id: 3 },
        { position: new Vector3(-4, -3, 0), id: 4 },
    ];

    const SwitchPositions: CanvasPositionsInterface[] = [
        { position: new Vector3(-7.5, 3.5, 0), id: 1 },
        { position: new Vector3(-7.5, 2.5, 0), id: 2 },
        { position: new Vector3(-7.5, -2.5, 0), id: 3 },
        { position: new Vector3(-7.5, -3.5, 0), id: 4 },
        { position: new Vector3(7.5, 2, 0), id: 5 },
        { position: new Vector3(7.5, -2, 0), id: 6 },
    ];
    return (
        <>

            {
                EXORGatePositions.map((EXORGatePosition, index) =>
                    <EXORGate meshPosition={EXORGatePosition.position} id={EXORGatePosition.id} key={index} />
                )
            }
            {
                SwitchPositions.map((switchPosition, index) =>
                    <SwitchButton meshPosition={switchPosition.position} id={switchPosition.id} key={index} />
                )
            }
            {/* <Line points={[curPoints1, curPoints2]} color={"#378805"} lineWidth={3} /> */}

        </>
    )
}

export default FlipFlopComps