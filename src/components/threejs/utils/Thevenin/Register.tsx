import { MeshBasicMaterial, SphereGeometry, Vector3 } from "three";
import ImageLoader from "../ImageLoader"
import img from './../../../../assets/thevininTheorem/Register.png';
import { useSelector } from "react-redux";
import { TheveninCanvasStore, selectDot, addLine, removeLine } from "../../../../store/slices/TheveninCanvasSlice";
import { useAppDispatch } from "../../../../store";
import { ConnectedDots } from "../../../../models/ConnectedDots";
import { Line } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { isIndexesConnected } from "../../helperFunctions/isIndexesConnected";

interface RegisterProps {
    meshPosition: Vector3;
    rotation?: [number, number, number];
    id: number;
}

const connectionPoints: SphereGeometry[] = [
    new SphereGeometry(0.2, 16, 16).translate(0, 1.60, 0),
    new SphereGeometry(0.2, 16, 16).translate(0, -1.60, 0),
]

const getPosPoints = (objPoint: Vector3, parentPos: Vector3, isRotated: boolean) => {
    /** As 2 registers are rotated, need to adjust the point position according to that.
     * that is why substracting the objPoint y (to make opposite sign, multiplying with -1)
     */
    const pos = isRotated ? [
        parentPos.x + (objPoint.y * -1),
        parentPos.y,
        parentPos.z,
    ] :
        [
            objPoint.x + parentPos.x,
            objPoint.y + parentPos.y,
            objPoint.z + parentPos.z,
        ];
    return pos as [number, number, number];
}

const Register = ({ meshPosition, id, rotation = [0, 0, 0] }: RegisterProps) => {

    const dispatch = useAppDispatch();
    // state
    const TheveninState = useSelector(TheveninCanvasStore)


    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        const objPoint = e.object.geometry.boundingSphere.center;
        const parentPos = e.object.parent?.position || { x: 0, y: 0, z: 0 } as Vector3;
        const dotIndex = e.object.userData.dot;
        console.log({ objPoint, parentPos });
        const pointPos: [number, number, number] = getPosPoints(objPoint, parentPos, rotation[2] !== 0);

        if (TheveninState.selectedDot.index === dotIndex) {
            dispatch(selectDot({ index: null, linePoints: [] }));
            return;
        }

        if (TheveninState.selectedDot.index === null) {
            dispatch(selectDot({ index: dotIndex, linePoints: pointPos }))
        } else {
            const selectedDot = TheveninState.selectedDot;
            dispatch(selectDot({ index: null, linePoints: [] }));

            /* remove existing point */
            if (selectedDot.index === null || selectedDot.linePoints.length === 0) return;
            const foundIndex = isIndexesConnected(selectedDot.index, dotIndex, TheveninState.allLines);
            if (foundIndex > -1) {
                dispatch(removeLine(foundIndex));
                return;
            }
            /* Add new point */
            const newLine = new ConnectedDots([selectedDot.index, dotIndex], [selectedDot.linePoints, pointPos]);
            dispatch(addLine(newLine));
        }

    }

    const isConnected = (index: string) => {
        return index === TheveninState.selectedDot.index;
    }

    return (
        <>
            <group userData={{ id: id }} position={meshPosition} rotation={rotation}>
                <ImageLoader meshPosition={meshPosition} id={id} img={img} />
                {
                    connectionPoints.map((dot: SphereGeometry, index: number) => {
                        return <mesh userData={{ dot: parseFloat(`${id}.${index}`).toFixed(1) }} key={index} geometry={dot} material={new MeshBasicMaterial({ color: isConnected(`${id}.${index}`) ? "yellow" : "red" })} onClick={(e) => handleClick(e)}></mesh>
                    })
                }
            </group>

            {/* Display all connected lines */}
            <group>
                {
                    TheveninState.allLines.length > 0 && TheveninState.allLines.map((linePoint: ConnectedDots, index: number) => {
                        const curPoints1: [number, number, number] = linePoint.getLinePoints()[0];
                        const curPoints2: [number, number, number] = linePoint.getLinePoints()[1];
                        return <Line key={index} points={[curPoints1, curPoints2]} color={"#378805"} lineWidth={3} />
                    })
                }
            </group>

        </>
    )
}

export default Register