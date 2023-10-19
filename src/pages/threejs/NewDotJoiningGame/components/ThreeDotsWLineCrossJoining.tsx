import { Line } from "@react-three/drei";
import { useState } from "react";
import { MeshBasicMaterial, SphereGeometry } from "three"

const ThreeDotsWLineCrossJoining = () => {
    const dots: SphereGeometry[] = [
        new SphereGeometry(0.8, 16, 16).translate(4, 0, 0),
        new SphereGeometry(0.8, 16, 16).translate(0, 4, 0),
        new SphereGeometry(0.8, 16, 16).translate(-4, 0, 0),
        new SphereGeometry(0.8, 16, 16).translate(0, -4, 0),
    ]

    const [selectedDot, setSelectedDot] = useState<[number, number] | null>(null);
    const [linePoints, setLinePoints] = useState<[number, number, number][] | []>([]);
    const [linePointsAll, setLinePointsAll] = useState<number[][][] | []>([]);

    const comparePoints = (pointsArr1 : [number, number, number], pointsArr2 : [number, number, number]) => pointsArr1[0]===pointsArr2[0] && pointsArr1[1]===pointsArr2[1] && pointsArr1[2]===pointsArr2[2]

    const handleClick = (dotPosition: [number, number, number], index: number) => {
        if (selectedDot === null || selectedDot[1] !== -1) {
            setSelectedDot([index, -1]);
            setLinePoints([dotPosition]);
        }
        else {
            setSelectedDot(null);
            
            setLinePoints([]);
            // if we have current points already selected, we remove the points(which will remove the line)
            const foundIndex = linePointsAll.findIndex((points : number[][])=> (comparePoints(points[0], linePoints[0]) && comparePoints(points[1], dotPosition)) || comparePoints(points[0], dotPosition) && comparePoints(points[1], linePoints[0]))
            if (foundIndex > -1) { 
                linePointsAll.splice(foundIndex, 1); // 2nd parameter means remove one item only
                setLinePointsAll([...linePointsAll]);
                return;
            }
            setLinePointsAll([...linePointsAll, [linePoints[0], dotPosition]]);
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
                linePointsAll.length>0 && linePointsAll.map((linePoint : number[][], index : number)=>{
                    // console.log({index, linePoint});
                    const curPoints1 : [number,number,number] = linePoint[0];
                    const curPoints2 : [number,number,number] = linePoint[1];
                    return <Line key = {index} points={[curPoints1,curPoints2]} color={"blue"} lineWidth={5} />
                })
            }
        </>
    )
}

export default ThreeDotsWLineCrossJoining