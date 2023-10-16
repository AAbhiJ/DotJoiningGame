import { BoxGeometry, SphereGeometry } from "three"

const SquareNDot = () => {
    return (
        <>
            <mesh geometry={new BoxGeometry(5, 5, 5)}>
                <meshBasicMaterial color={"red"} />
            </mesh>

            <mesh geometry={new SphereGeometry(1, 16, 16)} position={[0, 3, 0]}>
                <meshBasicMaterial color={"green"} />
            </mesh></>
    )
}

export default SquareNDot