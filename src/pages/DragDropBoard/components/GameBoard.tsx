import { useState } from "react"
import { ThreeEvent } from "@react-three/fiber";
import { angleToRadian } from "../../../helpers/func";
import HighlightedSqaure from "./HighlightedSqaure";
import { Vector3 } from "three";
import BoxMesh from "./BoxMesh";

function GameBoard() {

  const [boxPositions, setboxPositions] = useState<Vector3[]>([])

  const boardSize = 10;
  const [highlightSquarePos, sethighlightSquarePos] = useState<Vector3>(new Vector3(0.5, 0.5, 0))

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    const intersect = event.intersections[0];
    if (intersect.object.name === 'board') {
      const newHighlightPos = new Vector3().copy(intersect.point).floor().addScalar(0.5);
      newHighlightPos.setZ(0);
      sethighlightSquarePos(newHighlightPos);
    }
  };

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    const intersect = event.intersections[0];
    const objExists = boxPositions.find((boxPos: Vector3) => {
      return boxPos.x === highlightSquarePos.x && boxPos.y === highlightSquarePos.y;
    })
    if (!objExists && intersect.object.name === 'board') {
      console.log("added");
      setboxPositions([...boxPositions, new Vector3().copy(highlightSquarePos)])
    }
  };

  return (
    <>
      <mesh name="board"
        onPointerMove={(e) => handlePointerMove(e)}
        onPointerDown={(e) => handlePointerDown(e)}>

        <planeGeometry args={[boardSize, boardSize, boardSize]} />
        <meshBasicMaterial color={'white'} />
      </mesh>
      <HighlightedSqaure position={highlightSquarePos} />

      <gridHelper args={[boardSize]} rotation-x={angleToRadian(90)} />


      {/* Component to Render Small Box on Mouse Click */}
      {
        boxPositions.map((boxPos, index: number) => <BoxMesh key={index} position={boxPos}></BoxMesh>)
      }

    </>
  );
}

export default GameBoard;