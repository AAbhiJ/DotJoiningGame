import { Line } from "@react-three/drei";
import { useState } from "react";
import { MeshBasicMaterial, SphereGeometry } from "three"

const ThreeDotsWLineJoining = () => {
    const dots: SphereGeometry[] = [
        new SphereGeometry(1, 16, 16).translate(5, 0, 0),
        new SphereGeometry(1, 16, 16).translate(0, 5, 0),
        new SphereGeometry(1, 16, 16).translate(-5, 0, 0),
        // new SphereGeometry(1, 16, 16).translate(0, -5, 0),
    ]

    const [selectedDot, setSelectedDot] = useState<[number, number] | null>(null);
    const [linePoints, setLinePoints] = useState<[number, number, number][]>([]);

    const handleClick = (dotPosition: [number, number, number], index: number) => {
        if (selectedDot === null || selectedDot[1] !== -1) {
            setSelectedDot([index, -1]);
            setLinePoints([dotPosition]);
        }
        else {
            setSelectedDot([selectedDot[0], index]);
            setLinePoints([linePoints[0], dotPosition]);
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
                linePoints?.length == 2 && <Line points={linePoints} color={"green"} lineWidth={5} />
            }
        </>
    )
}

export default ThreeDotsWLineJoining