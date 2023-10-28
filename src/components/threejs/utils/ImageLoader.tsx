import { MeshBasicMaterial, SphereGeometry, TextureLoader, Vector3 } from "three";
import { THREEConf } from "../../../config/threejs";
import { useLoader } from "@react-three/fiber";


interface ImageLoaderProps {
    meshPosition: Vector3;
    img: string;
    id: number;
}

const ImageLoader = ({ img }: ImageLoaderProps) => {
    const imgTexture = useLoader(TextureLoader, img);
    const x = imgTexture.source.data.naturalWidth;
    const y = imgTexture.source.data.naturalHeight;
    const imgAspectRatio = x / y;
    /** 
     * imgAspectRatio = x/y
     * x = imgAspectRatio * y
     */
    const imgHeightToRender = THREEConf.ImgHeight;
    const [newX, newY] = [imgAspectRatio * imgHeightToRender, imgHeightToRender];

    return (
        <mesh>
            <planeGeometry args={[newX, newY]} />
            <meshBasicMaterial color={'white'} transparent={true} map={imgTexture} />
        </mesh>
    )
}

export default ImageLoader