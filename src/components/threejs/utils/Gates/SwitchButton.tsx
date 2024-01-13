import { Sphere } from "@react-three/drei";
import { useSelector } from "react-redux";
import { ThreeEvent } from "@react-three/fiber";
import { Vector3 } from "three";
import { useAppDispatch } from "../../../../store";
import { FlipFlopCanvasStore, FlipFlopSwitches, SwitchKey, addLine, removeLine, selectDot, toggleSwitch } from "../../../../store/slices/FlipFlopCanvasSlice";
import { isIndexesConnected } from "../../helperFunctions/isIndexesConnected";
import { ConnectedDots } from "../../../../models/ConnectedDots";

interface SwitchProps {
    meshPosition: Vector3;
    id: number;
}

const SwitchButton = ({ meshPosition, id }: SwitchProps) => {

    const dispatch = useAppDispatch();
    // state
    const flipFlopState = useSelector(FlipFlopCanvasStore)

    const handleSwitchButton = (id: number) => {
        if (id == 5 || id == 6) return;

        const switchId: SwitchKey = { switch: `SWITCH${id}`, value: false } as SwitchKey;
        dispatch(toggleSwitch(switchId));
    }

    const handleSwitchConnection = (e: ThreeEvent<MouseEvent>) => {
        // const objPoint = e.object.position;
        // const dotIndex = e.object.userData.dot;
        // const pointPos: [number, number, number] = [
        //     objPoint.x,
        //     objPoint.y,
        //     objPoint.z,
        // ]
        const objPoint = e.object.position;
        const parentPos = e.object.parent?.position || { x: 0, y: 0, z: 0 };
        const dotIndex = e.object.userData.dot;
        const pointPos: [number, number, number] = [
            objPoint.x + parentPos.x,
            objPoint.y + parentPos.y,
            objPoint.z + parentPos.z,
        ]


        if (flipFlopState.selectedDot.index === dotIndex) {
            dispatch(selectDot({ index: null, linePoints: [] }));
            return;
        }

        if (flipFlopState.selectedDot.index === null) {
            dispatch(selectDot({ index: dotIndex, linePoints: pointPos }))
            return;
        }

        const selectedDot = flipFlopState.selectedDot;
        dispatch(selectDot({ index: null, linePoints: [] }));

        /* remove existing point */
        if (selectedDot.index === null || selectedDot.linePoints.length === 0) return;
        const foundIndex = isIndexesConnected(selectedDot.index, dotIndex, flipFlopState.allLines);
        if (foundIndex > -1) {
            dispatch(removeLine(foundIndex));
            return;
        }
        /* Add new point */
        const newLine = new ConnectedDots([selectedDot.index, dotIndex], [selectedDot.linePoints, pointPos]);
        dispatch(addLine(newLine));


    }

    const isConnected = (index: string) => {
        return index === flipFlopState.selectedDot.index ? "yellow" : "red";
    }

    const getSwitchColor = (id: number) => {
        const switchId = `SWITCH${id}` as keyof FlipFlopSwitches;
        return flipFlopState.switch[switchId] ? 'red' : '#8b0000';
    }


    return (<group position={meshPosition}>
        <Sphere userData={{ dot: `SWITCHPOINT${id}` }} args={[0.2, 16, 16]} position={[0.5, 0, 0]} onClick={(e: ThreeEvent<MouseEvent>) => handleSwitchConnection(e)}>
            <meshBasicMaterial attach="material" color={isConnected(`SWITCHPOINT${id}`)} />
        </Sphere>
        <Sphere userData={{ dot: `SWITCH${id}` }} args={[0.3, 16, 16]} position={[id === 5 || id === 6 ? 1 : 0, 0, 0]} onClick={() => handleSwitchButton(id)}>
            <meshBasicMaterial attach="material" color={getSwitchColor(id)} />
        </Sphere>

    </group>);
}

export default SwitchButton;