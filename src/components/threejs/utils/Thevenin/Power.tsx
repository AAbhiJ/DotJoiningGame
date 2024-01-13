import { MeshBasicMaterial, SphereGeometry, Vector3 } from "three";
import ImageLoader from "../ImageLoader"
import img from './../../../../assets/thevininTheorem/power.png';
import { useSelector } from "react-redux";
import { TheveninCanvasStore, selectDot, addLine, removeLine } from "../../../../store/slices/TheveninCanvasSlice";
import { useAppDispatch } from "../../../../store";
import { ConnectedDots } from "../../../../models/ConnectedDots";
import { ThreeEvent } from "@react-three/fiber";
import { isIndexesConnected } from "../../helperFunctions/isIndexesConnected";


interface PowerProps {
    meshPosition: Vector3;
    id: number;
}

const connectionPoints: SphereGeometry[] = [
    new SphereGeometry(0.2, 16, 16).translate(0, 1.60, 0),
    new SphereGeometry(0.2, 16, 16).translate(0, -1.60, 0),
]


const Power = ({ meshPosition, id }: PowerProps) => {

    const dispatch = useAppDispatch();
    // state
    const TheveninState = useSelector(TheveninCanvasStore)

    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        const objPoint = e.object.geometry.boundingSphere.center;
        const parentPos = e.object.parent?.position || {x:0, y:0, z:0};
        const dotIndex = e.object.userData.dot;
        const pointPos: [number, number, number] = [
            objPoint.x + parentPos.x,
            objPoint.y + parentPos.y,
            objPoint.z + parentPos.z,
        ]

        if(TheveninState.selectedDot.index === dotIndex){
            dispatch(selectDot({index : null, linePoints : []}));
            return;
        }

        if (TheveninState.selectedDot.index === null) {
            dispatch(selectDot({ index: dotIndex, linePoints: pointPos }))
        } else {
            const selectedDot = TheveninState.selectedDot;
            dispatch(selectDot({index : null, linePoints : []}));

            /* remove existing point */
            if (selectedDot.index === null || selectedDot.linePoints.length ===0) return;
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

    const isConnected = (index : string)=>{
        return index === TheveninState.selectedDot.index;
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
        </>
    )
}

export default Power