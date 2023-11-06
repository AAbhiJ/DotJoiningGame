import FlipFlopComps from '../../components/practicalPlayground/FlipFlopComps'
import BaseCanvas from '../../components/threejs/utils/BaseCanvas'
import EXORGateFloatingMenu from '../../components/threejs/utils/Gates/EXORGateFloatingMenu'

const FlipFlop = () => {

  return (
    <>
      <div className="container">
        <div className="floatingMenu">
          <EXORGateFloatingMenu/>
        </div>
        <BaseCanvas>
          <FlipFlopComps />
        </BaseCanvas>
      </div>
    </>
  )
}

export default FlipFlop