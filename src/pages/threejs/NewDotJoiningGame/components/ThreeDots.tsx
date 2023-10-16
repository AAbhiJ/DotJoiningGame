import { MeshBasicMaterial, SphereGeometry } from "three"

const ThreeDots = () => {
    const dots: SphereGeometry[] = [
        new SphereGeometry(1, 16, 16).translate(5, 0, 0),
        new SphereGeometry(1, 16, 16).translate(0, 5, 0),
        new SphereGeometry(1, 16, 16).translate(-5, 0, 0),
        new SphereGeometry(1, 16, 16).translate(0, -5, 0),
    ]

    return (
        <>
        {
            dots.map((dot : SphereGeometry, index : number) => {
                return <mesh key={index} geometry={dot} material={new MeshBasicMaterial({ color: "red" })}>
                </mesh>
            })
        }
        </>
    )
}

export default ThreeDots