import FlipFlopComps from '../../components/practicalPlayground/FlipFlopComps'
import BaseCanvas from '../../components/threejs/utils/BaseCanvas'
import { useSelector } from 'react-redux';
import { FlipFlopCanvasStore } from '../../store/slices/FlipFlopCanvasSlice';


const FlipFlop = () => {

  // state
  const flipFlopState = useSelector(FlipFlopCanvasStore)


  const handleClick = ()=>{
    console.log(flipFlopState);
  }
  return (
    <>
    <div>
    <button onClick={handleClick}>Click </button>
    </div>
    <BaseCanvas>
        <FlipFlopComps/>
    </BaseCanvas>
  </>
  )
}

export default FlipFlop