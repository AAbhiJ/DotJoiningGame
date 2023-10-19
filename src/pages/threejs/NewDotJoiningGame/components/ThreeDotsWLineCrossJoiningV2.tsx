import { Line } from "@react-three/drei";
import { useState } from "react";
import { MeshBasicMaterial, SphereGeometry } from "three"

export class ConnectedDots {
    private indexes: [number, number];
    private linePoints: [[number, number, number], [number, number, number]];

    constructor(indexes: [number, number], linePoints: [[number, number, number], [number, number, number]]) {
        this.indexes = indexes;
        this.linePoints = linePoints;
    }

    getIndexes() {
        return this.indexes;
    }

    getLinePoints() {
        return this.linePoints;
    }
}

const isIndexesConnected = (index1: number, index2: number, connectedDots: ConnectedDots[]) => {
    return connectedDots.findIndex(point => {
        const curDotIndex = point.getIndexes();
        return (curDotIndex[0] === index1 && curDotIndex[1] === index2) || (curDotIndex[0] === index2 && curDotIndex[1] === index1) 
    });
}

const ThreeDotsWLineCrossJoiningV2 = () => {
    const dots: SphereGeometry[] = [
        new SphereGeometry(0.8, 16, 16).translate(4, 0, 0),
        new SphereGeometry(0.8, 16, 16).translate(0, 4, 0),
        new SphereGeometry(0.8, 16, 16).translate(-4, 0, 0),
        new SphereGeometry(0.8, 16, 16).translate(0, -4, 0),
    ]

    const [selectedDot, setSelectedDot] = useState<[number, number] | null>(null);
    const [linePoints, setLinePoints] = useState<[number, number, number][] | []>([]);
    const [linePointsAll, setLinePointsAll] = useState<ConnectedDots[]>([]);

    // const comparePoints = (pointsArr1: [number, number, number], pointsArr2: [number, number, number]) => pointsArr1[0] === pointsArr2[0] && pointsArr1[1] === pointsArr2[1] && pointsArr1[2] === pointsArr2[2]

    const handleClick = (dotPosition: [number, number, number], index: number) => {
        if (selectedDot === null || selectedDot[1] !== -1) {
            setSelectedDot([index, -1]);
            setLinePoints([dotPosition]);
        }
        else {
            setLinePoints([]);
            setSelectedDot(null);

            /* remove existing point */
            const foundIndex = isIndexesConnected(selectedDot[0], index, linePointsAll);
            if (foundIndex > -1) {
                linePointsAll.splice(foundIndex, 1); // 2nd parameter means remove one item only
                setLinePointsAll([...linePointsAll]);
                return;
            }
            /* Add new point */
            const newLine = new ConnectedDots([selectedDot[0], index], [linePoints[0], dotPosition]);
            setLinePointsAll([...linePointsAll, newLine]);
        }
    }

    const isDotSelected = (index: number): boolean => {
        return (selectedDot !== null && (selectedDot[0] === index || selectedDot[1] === index));
    }

    return (
        <>
            {
                dots.map((dot: SphereGeometry, index: number) => {
                    return <mesh key={index} geometry={dot} material={new MeshBasicMaterial({ color: isDotSelected(index) ? "yellow" : "red" })}
                        // material={new MeshBasicMaterial({ color: isDotSelected(index) ? 0xffff00 : 0xff0000 })}
                        onClick={() => {
                            const [x, y, z] = dot.boundingSphere !== null ? dot.boundingSphere.center : [0, 0, 0];
                            handleClick([x, y, z], index);
                        }}
                    >
                    </mesh>
                })
            }
            {
                linePointsAll.length > 0 && linePointsAll.map((linePoint: ConnectedDots, index: number) => {
                    const curPoints1: [number, number, number] = linePoint.getLinePoints()[0];
                    const curPoints2: [number, number, number] = linePoint.getLinePoints()[1];
                    return <Line key={index} points={[curPoints1, curPoints2]} color={"orange"} lineWidth={5} />
                })
            }
        </>
    )
}

export default ThreeDotsWLineCrossJoiningV2