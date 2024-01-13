import { Vector3 } from "three";
import Power from "../threejs/utils/Thevenin/Power";
import Register from "../threejs/utils/Thevenin/Register";

const D90 = Math.PI / 2;
interface CanvasPositionsInterface {
    position: Vector3,
    rotation?: [number, number, number]
    id: number
}

const RegisterPositions: CanvasPositionsInterface[] = [
    { position: new Vector3(6, 0, 0), id: 1, rotation: [0, 0, 0] },
    { position: new Vector3(0, 0, 0), id: 2, rotation: [0, 0, 0] },
    { position: new Vector3(3, 3, 0), id: 3, rotation: [0, 0, D90] },
    { position: new Vector3(-3, 3, 0), id: 4, rotation: [0, 0, D90] },
];

const PowerPosition: CanvasPositionsInterface = { position: new Vector3(-6, 0, 0), id: 5 };

const TheveninComps = () => {
    return (
        <>

            {
                RegisterPositions.map((EXORGatePosition, index) =>
                    <Register meshPosition={EXORGatePosition.position} rotation={EXORGatePosition.rotation} id={EXORGatePosition.id} key={index} />
                )
            }
            <Power meshPosition={PowerPosition.position} id={PowerPosition.id} />
        </>
    )
}

export default TheveninComps