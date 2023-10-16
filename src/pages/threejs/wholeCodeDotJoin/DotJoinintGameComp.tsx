import { OrthographicCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useState } from "react"
import { LineBasicMaterial, SphereGeometry } from "three"

const DotJoiningGameComp = () => {

    const [dots, setDots] = useState([
        new SphereGeometry(1, 16, 16).translate(100, 100, 0),
        new SphereGeometry(1, 16, 16).translate(300, 100, 0),
        new SphereGeometry(1, 16, 16).translate(500, 100, 0),
    ]);

    const [selectedDot, setSelectedDot] = useState(null);

    const lineMaterial = useMemo(() => {
        const material = new LineBasicMaterial({ color: "white" });
        return material;
    }, []);

    const lineGeometry = useMemo(() => {
        const material = new SphereGeometry(1, 16, 16);
        return material;
    }, []);

    const [linePosition, setLinePosition] = useState([0, 0]);

    useEffect(() => {
        if (selectedDot) {
            setLinePosition([dots[selectedDot].position.x, dots[selectedDot].position.y])
        }
    }, [selectedDot]);

    useFrame(() => {
        if (selectedDot) {
            const newLinePosition = [mouse.x, mouse.y];
            setLinePosition(newLinePosition);
        }
    });

    const onMouseUp = (event) => {
        const dotIndex = dots.findIndex((dot6) => dot.position.distanceTo(event.clientX, event.clientY) < 10);
        if (dotIndex !== -1 && dotIndex !== selectedDot) {
            const newDots = [...dots];
            newDots[selectedDot].position.x = event.clientX;
            newDots[selectedDot].position.y = event.clientY;
            setDots(newDots);
        }
        setSelectedDot(null);
    }

    return (
        <>
            {dots.map((dot, index) => {
                return <mesh key={index} geometry={dot} material={lineMaterial}>
                    <meshBasicMaterial color={"black"} />
                </mesh>
            })}

            {
                selectedDot && (
                    <mesh geometry={lineGeometry} material={lineMaterial}>
                        <meshBasicMaterial color={"white"} />
                    </mesh>
                )
            }

        </>
    )
}

export default DotJoiningGameComp