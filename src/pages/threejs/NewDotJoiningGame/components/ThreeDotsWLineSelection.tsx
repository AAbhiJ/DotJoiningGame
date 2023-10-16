import { Line } from "@react-three/drei";
import { useState } from "react";
import { MeshBasicMaterial, SphereGeometry } from "three"

const ThreeDotsWLineSelection = () => {
    const dots: SphereGeometry[] = [
        new SphereGeometry(1, 16, 16).translate(5, 0, 0),
        new SphereGeometry(1, 16, 16).translate(0, 5, 0),
        new SphereGeometry(1, 16, 16).translate(-5, 0, 0),
        // new SphereGeometry(1, 16, 16).translate(0, -5, 0),
    ]

    const [selectedDot, setSelectedDot] = useState<number | null>(null);
    const [linePoints, setLinePoints] = useState<[number, number, number][]>([[0, 0, 0]]);

    const handleClick = (dotPosition: [number, number, number], index: number) => {
        if (isDotSelected(index)) {
            // Deselect the dot if it is clicked again
            setSelectedDot(null);
            setLinePoints([[0, 0, 0]]);
        }
        else {
            setSelectedDot(index);
            setLinePoints([[0, 0, 0], dotPosition]);
        }
    }

    const isDotSelected = (index : number): boolean => {
        return (selectedDot !== null && selectedDot === index)
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
            <Line points={linePoints} color={"green"} lineWidth={5} />
        </>
    )
}

export default ThreeDotsWLineSelection