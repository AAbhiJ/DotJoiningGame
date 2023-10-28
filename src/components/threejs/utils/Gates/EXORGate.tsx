import { MeshBasicMaterial, SphereGeometry, Vector3 } from "three";
import ImageLoader from "../ImageLoader"
import img from './../../../../assets/EXORassets_4.png';
import { useSelector } from "react-redux";
import { FlipFlopCanvasStore, selectDot, addLine, removeLine } from "../../../../store/slices/FlipFlopCanvasSlice";
import { useAppDispatch } from "../../../../store";
import { ConnectedDots } from "../../../../models/ConnectedDots";
import { Line } from "@react-three/drei";


interface EXORGateProps {
    meshPosition: Vector3;
    id: number;
}

const isIndexesConnected = (index1: string, index2: string, connectedDots: ConnectedDots[]) => {
    return connectedDots.findIndex(point => {
        const curDotIndex = point.getIndexes();
        return (curDotIndex[0] === index1 && curDotIndex[1] === index2) || (curDotIndex[0] === index2 && curDotIndex[1] === index1)
    });
}


const EXORGate = ({ meshPosition, id }: EXORGateProps) => {

    const dispatch = useAppDispatch();
    // state
    const flipFlopState = useSelector(FlipFlopCanvasStore)

    const connectionPoints: SphereGeometry[] = [
        new SphereGeometry(0.2, 16, 16).translate(1.75, 0, 0),
        new SphereGeometry(0.2, 16, 16).translate(-1.75, 0.55, 0),
        new SphereGeometry(0.2, 16, 16).translate(-1.75, -0.55, 0),
    ]

    const handleClick = (e: THREE.Event) => {

        const objPoint = e.object.geometry.boundingSphere.center;
        const parentPos = e.object.parent.position;
        const dotIndex = e.object.userData.dot;
        const pointPos: [number, number, number] = [
            objPoint.x + parentPos.x,
            objPoint.y + parentPos.y,
            objPoint.z + parentPos.z,
        ]

        if(flipFlopState.selectedDot.index === dotIndex){
            dispatch(selectDot({index : null, linePoints : []}));
            return;
        }

        if (flipFlopState.selectedDot.index === null) {
            dispatch(selectDot({ index: dotIndex, linePoints: pointPos }))
        } else {
            const selectedDot = flipFlopState.selectedDot;
            dispatch(selectDot({index : null, linePoints : []}));

            /* remove existing point */
            if (selectedDot.index === null || selectedDot.linePoints.length ===0) return;
            const foundIndex = isIndexesConnected(selectedDot.index, dotIndex, flipFlopState.allLines);
            if (foundIndex > -1) {
                dispatch(removeLine(foundIndex));
                return;
            }
            /* Add new point */
            const newLine = new ConnectedDots([selectedDot.index, dotIndex], [selectedDot.linePoints, pointPos]);
            dispatch(addLine(newLine));
        }

    }

    const isConnected = (index : string)=>{
        return index === flipFlopState.selectedDot.index;
    }

    return (
        <>
            <group userData={{ id: id }} position={meshPosition}>
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
                flipFlopState.allLines.length > 0 && flipFlopState.allLines.map((linePoint: ConnectedDots, index: number) => {
                    const curPoints1: [number, number, number] = linePoint.getLinePoints()[0];
                    const curPoints2: [number, number, number] = linePoint.getLinePoints()[1];
                    return <Line key={index} points={[curPoints1, curPoints2]} color={"#378805"} lineWidth={3} />
                })
            }
            </group>

        </>
    )
}

export default EXORGate